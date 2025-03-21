import { Category } from '@/components/Category/Category';
import Navigation from '@/components/Navigation/Navigation';
import Link from 'next/link';


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <div className='container'>
      <Navigation />
      <h1>{category}</h1>
      <Category slug={category} />
      <Link className="tilbaka" href="/addQuestion">Bæta við spurningu</Link>
    </div>
  );
}