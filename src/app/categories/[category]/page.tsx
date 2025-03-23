import { QuestionsApi } from '@/api';
import { Category } from '@/components/Category/Category';
import Navigation from '@/components/Navigation/Navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  // Sækjum flokkargögnin með QuestionsApi
  const api = new QuestionsApi();
  const categoryData = await api.getCategory(category);

  // Ef flokkurinn er ekki til, birtum við 404-síðu
  if (!categoryData) {
    return (
      <div className='container'>
        <h1>Error</h1>
        <h1>404</h1>
        <p>Flokkurinn {category} fannst ekki</p>
        <Navigation />
      </div>
    )
  }
  return (
    <div className='container'>
      <Navigation />
      <h1>{category}</h1>
      <Category slug={category} />
      <Link className="tilbaka" href="/addQuestion">Bæta við spurningu</Link>
    </div>
  );
}