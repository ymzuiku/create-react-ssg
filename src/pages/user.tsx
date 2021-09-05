export default function User(props: Record<string, unknown>) {
  return <div>ssr props: {JSON.stringify(props)}</div>;
}
