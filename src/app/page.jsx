import { Button } from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link legacyBehavior href="/step-1">
        <Button as="a" className="text-2xl !p-4">
          Start your story
        </Button>
      </Link>
    </div>
  );
}
