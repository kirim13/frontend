function Button({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-row gap-4 my-2">{children}</div>;
}

export default Button;
