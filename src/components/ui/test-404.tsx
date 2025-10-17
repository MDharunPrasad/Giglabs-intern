import { NotFoundPage } from "@/components/ui/404-page-not-found";
import { PageNotFoundDemo } from "@/components/ui/demo";

// Test component to demonstrate the 404 page
export function NotFoundPageTest() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Direct NotFoundPage Component:</h2>
        <NotFoundPage />
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">PageNotFoundDemo Component:</h2>
        <PageNotFoundDemo />
      </div>
    </div>
  );
}