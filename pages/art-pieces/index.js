import useStore from "@/lib/useStore";
import ArtPieces from "../../components/ArtPieces";

export default function ArtPiecesPage() {
  const pieces = useStore((state) => state.pieces);

  return <ArtPieces pieces={pieces} />;
}
