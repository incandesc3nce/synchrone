interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <article className="size-full flex flex-col gap-2 p-4 bg-neutral-900 border-2 border-neutral-700 rounded-xl hover:bg-neutral-800 hover:border-blue-600 transition-colors duration-150">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="">{description}</p>
    </article>
  );
};
