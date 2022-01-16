import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/ImprovementAddComponent'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
