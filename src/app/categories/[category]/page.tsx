import { Category } from '@/components/Category/Category';
import Navigation from '@/components/Navigation/Navigation';


export default async function FlokkaPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <div>
      <Navigation />
      <h1>Flokkur: {category}</h1>
      {/* <Category slug={category} /> */}
    </div>
  );
}