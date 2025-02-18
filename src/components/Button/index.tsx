import { StyledButton } from "./styles"

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  width?: string;
  height?: string;
  className?: string;
};

export function Button({ children, width, height, className, ...rest }: Props) {
  return (
    <StyledButton width={width} height={height} className={className} {...rest}>
      {children}
    </StyledButton>
  )
}