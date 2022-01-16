import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/CommedationsComponent'), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
