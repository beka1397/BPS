export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl px-6">{children}</div>;
}

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <Container>
        <div className="py-16">{children}</div>
      </Container>
    </section>
  );
}
