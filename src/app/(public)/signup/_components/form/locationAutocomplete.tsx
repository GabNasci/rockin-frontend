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
  const { control, setValue, getValues } = useFormContext(); // Adicionado getValues para verificar se o campo existe
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const skipNextFetchRef = useRef(false);

  useEffect(() => {
    if (!autocompleteService.current && window.google?.maps?.places) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, []);

  useEffect(() => {
    if (!input || skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      setSuggestions([]);
      return;
    }

    const fetchPredictions = () => {
      autocompleteService.current?.getPlacePredictions(
        { input },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
          } else {
            console.error(
              "Autocomplete prediction failed with status:",
              status,
            );
            setSuggestions([]);
          }
        },
      );
    };

    const debounce = setTimeout(fetchPredictions, 300);
    return () => clearTimeout(debounce);
  }, [input]);

  const handleSelect = (suggestion: PlacePrediction) => {
    skipNextFetchRef.current = true;
    setInput(suggestion.description); // Atualiza o valor visual do input com a descrição completa
    setSuggestions([]);

    if (!placesService.current && mapRef.current && window.google) {
      const dummyMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 1,
      });
      placesService.current = new window.google.maps.places.PlacesService(
        dummyMap,
      );
    }

    if (!suggestion.place_id) {
      console.error("No place_id found for suggestion:", suggestion);
      // Limpar campos do formulário em caso de erro ou ausência de place_id
      setValue("city", "", { shouldValidate: true, shouldDirty: true });
      setValue("state", "", { shouldValidate: true, shouldDirty: true });
      setValue("country", "", { shouldValidate: true, shouldDirty: true });
      setValue("latitude", "", { shouldValidate: true, shouldDirty: true });
      setValue("longitude", "", { shouldValidate: true, shouldDirty: true });
      // Se tiver um campo bairro:
      // if (Object.keys(getValues()).includes("neighborhood")) {
      //   setValue("neighborhood", "", { shouldValidate: true, shouldDirty: true });
      // }
      return;
    }

    placesService.current?.getDetails(
      {
        placeId: suggestion.place_id,
        fields: [
          "address_components",
          "geometry",
          "name", // Nome do local
          "types", // Tipos do local (ex: "locality", "political")
        ],
      },
      (place: PlaceResult | null, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place
        ) {
          const components = place.address_components || [];

          const getComponent = (
            type: string,
            useShortName: boolean = false,
          ) => {
            const component = components.find((c) => c.types.includes(type));
            if (component) {
              return useShortName ? component.short_name : component.long_name;
            }
            return "";
          };

          // LÓGICA REFINADA PARA CIDADE:
          let city = getComponent("locality");
          const adminArea2 = getComponent("administrative_area_level_2");

          // No Brasil, administrative_area_level_2 (município) é geralmente a cidade.
          // Se 'locality' for diferente de 'adminArea2' e 'adminArea2' existir,
          // pode ser que 'locality' seja um distrito ou algo mais específico.
          // Nestes casos, ou se 'locality' não existir, preferimos 'adminArea2'.
          if ((city && adminArea2 && city !== adminArea2) || !city) {
            if (adminArea2) {
              city = adminArea2;
            }
          }

          // Fallback final se ainda não houver cidade, usando o nome do local se ele for do tipo cidade.
          if (
            !city &&
            place.name &&
            (place.types?.includes("locality") ||
              place.types?.includes("administrative_area_level_2"))
          ) {
            city = place.name;
          }

          // BAIRRO:
          // Geralmente 'sublocality' ou 'sublocality_level_1'.
          const neighborhood =
            getComponent("sublocality") || getComponent("sublocality_level_1");

          const state = getComponent("administrative_area_level_1"); // Nome longo: "São Paulo"
          const stateShort = getComponent("administrative_area_level_1", true); // Nome curto: "SP"
          const country = getComponent("country"); // Nome longo: "Brazil"

          // Atualiza os valores do formulário.
          // O Controller com name="city" já atualizou o campo city com o input de texto.
          // Aqui, sobrescrevemos com o valor parseado da cidade.
          setValue("city", city, { shouldValidate: true, shouldDirty: true });
          setValue("state", stateShort || state, {
            shouldValidate: true,
            shouldDirty: true,
          }); // Prefere nome curto do estado
          setValue("country", country, {
            shouldValidate: true,
            shouldDirty: true,
          }); // Nome longo do país

          // Se você tiver um campo para bairro no seu formulário:
          // (Adapte "neighborhood" para o nome real do seu campo no react-hook-form)
          // Exemplo: verificar se o campo existe antes de tentar setar
          const formFields = getValues(); // Pega todos os valores/campos atuais do formulário
          if (
            Object.prototype.hasOwnProperty.call(formFields, "neighborhood")
          ) {
            setValue("neighborhood", neighborhood, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }

          const location = place.geometry?.location;
          if (location) {
            setValue("latitude", location.lat().toString(), {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("longitude", location.lng().toString(), {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        } else {
          console.error("PlacesService.getDetails failed with status:", status);
          // Considerar limpar os campos do formulário ou notificar o usuário
        }
      },
    );
  };

  return (
    <>
      <Controller
        name="city" // Este é o campo do formulário que será atualizado
        control={control}
        render={({ field }) => (
          <div>
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Digite sua cidade"
                value={input} // Valor visual do input é o estado local 'input'
                onValueChange={(value) => {
                  setInput(value);
                  // Atualiza o campo 'city' do formulário em tempo real conforme o usuário digita
                  field.onChange(value);
                }}
              />
              {suggestions.length > 0 && (
                <CommandList>
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.place_id}
                      value={suggestion.description}
                      onSelect={() => handleSelect(suggestion)}
                    >
                      {suggestion.description}
                    </CommandItem>
                  ))}
                </CommandList>
              )}
            </Command>
            {/* {error && <p className="text-red-500 text-sm">{error.message}</p>} */}
          </div>
        )}
      />
      <div ref={mapRef} style={{ display: "none" }} />
    </>
  );
}
