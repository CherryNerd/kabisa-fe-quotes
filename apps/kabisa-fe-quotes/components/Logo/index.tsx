

export default function Logo() {

  return (
    <picture>
      <source srcSet={'images/logo/Kabisa.webp'} type={"image/webp"}/>
      <source srcSet={'images/logo/Kabisa.avif'} type={"image/avif"}/>
      <source srcSet={'images/logo/Kabisa.png'} type={"image/png"}/>
      <img src={'images/logo/Kabisa.jpg'} alt={"Kabisa logo"}
           className="h-8 w-auto"
      />
    </picture>
  )
}
