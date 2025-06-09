// components/shared/pagination-control.tsx

"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

type PaginationControlProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFirstPage: boolean;
  isLastPage: boolean;
};

export default function PaginationControl({
  page,
  totalPages,
  onPageChange,
  isFirstPage,
  isLastPage,
}: PaginationControlProps) {
  return (
    <Pagination className="justify-center mt-6">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            className="cursor-pointer"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={isFirstPage}
          >
            <PaginationPrevious />
          </Button>
        </PaginationItem>
        <span className="px-4 py-2 text-sm">
          Página {page} de {totalPages}
        </span>
        <PaginationItem>
          <Button
            variant="outline"
            className="cursor-pointer"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={isLastPage}
          >
            <PaginationNext />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
