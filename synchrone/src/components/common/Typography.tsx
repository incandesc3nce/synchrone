interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  children: React.ReactNode;
}

export const typographyVariants = {
  h1: 'md:text-6xl scroll-m-20 text-3xl font-extrabold tracking-tight',
  h2: 'scroll-m-20 pb-2 md:text-3xl text-2xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'scroll-m-18 text-lg tracking-tight',
  h6: 'scroll-m-18 text-lg tracking-tight',
  p: 'md:text-base text-sm leading-7',
  span: 'md:text-base text-sm leading-7',
};

export const Typography = (props: TypographyProps) => {
  const { variant = 'p', className, children } = props;
  const variantClass = typographyVariants[variant];
  const Text = variant;

  return (
    <Text className={variantClass + (className ? ` ${className}` : '')}>
      {children}
    </Text>
  );
};
