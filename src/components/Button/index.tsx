import { StyledButton, CartBadge } from "./styles";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  width?: string;
  height?: string;
  className?: string;
  badge?: number; // Número do badge
};

export function Button({ children, width, height, className, badge = 0, ...rest }: Props) {
  return (
    <StyledButton width={width} height={height} className={className} {...rest}>
      {children}
      {badge > 0 ? <CartBadge>{badge}</CartBadge> : null} {/* Só exibe se for maior que 0 */}
    </StyledButton>
  );
}
