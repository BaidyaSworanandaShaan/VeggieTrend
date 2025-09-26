import AvgMarketPriceChart from "../../components/Charts/AvgMarketPriceChart";
import Banner from "../../components/Home/Banner";
import CategoriesSection from "../../components/Home/CategoriesSection";
import CheapestPrices from "../../components/Home/CheapestPrices";
import ExpensivePrices from "../../components/Home/ExpensivePrices";
import LatestPrices from "../../components/Home/LatestPrices";
import VolatilePrices from "../../components/Home/VolatilePrices";
const Home = () => {
  return (
    <>
      <Banner />
      <LatestPrices />
      <CategoriesSection />
      <AvgMarketPriceChart />
      <section className="my-40">
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row md:justify-between gap-10">
            <div className="expensive-price flex-1">
              <ExpensivePrices />
            </div>
            <div className="cheapest-price flex-1">
              <CheapestPrices />
            </div>
            <div className="volatile-price flex-2">
              <VolatilePrices />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
