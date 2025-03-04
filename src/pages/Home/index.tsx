import { ProductCard } from "../../components/Card";
import { Header } from "../../components/Header";
import { HeroSection } from "../HeroSection";
import { coffees } from "../../../data_coffee_list.json";
import { CoffeeList } from "./styles";

export function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <CoffeeList>
        <h2 aria-label="Lista de cafés disponíveis">Nossos cafés</h2>
        <div>
          {coffees?.length > 0 ? (
            coffees.map((coffee) => (
              <ProductCard key={coffee.id} coffee={coffee} />
            ))
          ) : (
            <p>Nenhum café disponível no momento.</p>
          )}
        </div>
      </CoffeeList>
    </div>
  );
}
