import dynamic from "next/dynamic";
import ProductC from '../components/Product_Category';

const ImageSlider = dynamic(()=> import("./../components/ImageSlider"),{
  ssr:false,
}); 

const Promotional_Items = dynamic(()=> import("./../components/Promotional_Items"),{
  ssr:false,
}); 

export default function Home() {
  return (
    <div className="space-y-6">
      <ImageSlider /> 
      <ProductC/>
      <Promotional_Items/>
      <div className="text-center">
        DALEJ NIE ZNALAZŁEŚ CZEGO SZUKASZ? 
      </div>
    </div>
  );
}
