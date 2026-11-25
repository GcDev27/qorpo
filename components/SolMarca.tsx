import { SOL_PATH } from "@/lib/sol";

// O sol da logo em tamanho pequeno, usando a cor do texto ao redor
export default function SolMarca({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      <path d={SOL_PATH} fill="currentColor" />
    </svg>
  );
}
