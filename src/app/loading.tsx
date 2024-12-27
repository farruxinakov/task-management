import { LoaderIcon } from "lucide-react";

import { Container } from "@/shared/custom/container";

export default function LoadingPage() {
  return (
    <div className="flex h-dvh items-center py-12">
      <Container>
        <div className="flex justify-center">
          <LoaderIcon className="animate-spin" />
        </div>
      </Container>
    </div>
  );
}
