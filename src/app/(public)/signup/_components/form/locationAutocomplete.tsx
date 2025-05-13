import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { useEffect, useRef, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

type PlacePrediction = google.maps.places.AutocompletePrediction;
type PlaceResult = google.maps.places.PlaceResult;

export function LocationAutocomplete() {
  const { control, setValue } = useFormContext();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Ref para controlar se a próxima busca de previsões deve ser pulada
  const skipNextFetchRef = useRef(false);

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, []);

  useEffect(() => {
    // Se o input estiver vazio, limpa as sugestões e não faz nada
    if (!input) {
      setSuggestions([]);
      return;
    }

    // Se skipNextFetchRef.current for true, significa que o input foi atualizado
    // a partir da seleção de uma sugestão. Então, resetamos a flag e
    // não buscamos novas previsões desta vez.
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      // As sugestões já foram limpas no handleSelect,
      // então não é necessário fazer setSuggestions([]) aqui novamente.
      return;
    }

    const fetchPredictions = () => {
      autocompleteService.current?.getPlacePredictions(
        {
          input,
          types: ["geocode"], // Restringe a busca a geocodificações (cidades, endereços)
        },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]); // Limpa sugestões em caso de erro ou nenhum resultado
          }
        },
      );
    };

    // Debounce para evitar chamadas excessivas à API enquanto o usuário digita
    const debounce = setTimeout(fetchPredictions, 300);
    return () => clearTimeout(debounce); // Limpa o timeout ao desmontar ou antes da próxima execução
  }, [input]); // Dependência: reexecuta quando 'input' muda

  const handleSelect = (suggestion: PlacePrediction) => {
    // Sinaliza que a próxima atualização do 'input' não deve disparar uma busca
    skipNextFetchRef.current = true;

    setInput(suggestion.description); // Atualiza o valor do campo de input
    setValue("city", suggestion.description); // Atualiza o valor do formulário (React Hook Form)
    setSuggestions([]); // Limpa a lista de sugestões imediatamente

    // Inicializa o PlacesService se ainda não foi inicializado
    if (!placesService.current && mapRef.current && window.google) {
      // Cria um mapa dummy para instanciar o PlacesService, como é uma exigência da API
      const dummyMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 }, // Coordenadas irrelevantes para este propósito
        zoom: 1,
      });
      placesService.current = new window.google.maps.places.PlacesService(
        dummyMap,
      );
    }

    // Busca detalhes do local selecionado (estado, país, latitude, longitude)
    placesService.current?.getDetails(
      {
        placeId: suggestion.place_id,
        fields: ["address_components", "geometry"], // Campos que queremos obter
      },
      (place: PlaceResult | null, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place
        ) {
          const components = place.address_components || [];

          const getComponent = (type: string) =>
            components.find((c) => c.types.includes(type))?.long_name || "";

          const state = getComponent("administrative_area_level_1"); // Estado
          const country = getComponent("country"); // País

          setValue("state", state);
          setValue("country", country);

          const location = place.geometry?.location;
          if (location) {
            setValue("latitude", location.lat().toString());
            setValue("longitude", location.lng().toString());
          }
        }
      },
    );
  };

  return (
    <>
      <Controller
        name="city" // Nome do campo no React Hook Form
        control={control}
        render={({ field }) => (
          <div>
            <Command shouldFilter={false}>
              {" "}
              {/* Desabilitar filtro interno se a API já filtra */}
              <CommandInput
                placeholder="Digite sua cidade"
                value={input} // Controlado pelo estado 'input'
                onValueChange={(value) => {
                  // Não definir skipNextFetchRef aqui, pois esta é a digitação do usuário
                  setInput(value); // Atualiza o estado 'input' local para buscar sugestões
                  field.onChange(value); // Atualiza o estado do React Hook Form
                }}
              />
              {/* Renderiza a lista de sugestões apenas se houver sugestões */}
              {suggestions.length > 0 && (
                <CommandList>
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.place_id}
                      value={suggestion.description} // Valor usado para acessibilidade e filtro (se habilitado)
                      onSelect={() => handleSelect(suggestion)} // Ação ao selecionar
                    >
                      {suggestion.description}
                    </CommandItem>
                  ))}
                </CommandList>
              )}
            </Command>
          </div>
        )}
      />
      {/* Elemento div oculto necessário para a API do Google PlacesService */}
      <div ref={mapRef} style={{ display: "none" }} />
    </>
  );
}
