import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/CommedationAddComponent'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
