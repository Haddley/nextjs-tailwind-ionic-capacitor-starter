import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/ImprovementsComponent'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
