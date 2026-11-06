import Button from "../common/Button";

function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button href="#about" showArrow>
        <span className="font-semibold text-white">About me</span>
      </Button>

      <Button href="#projects" variant="secondary">
        <span className="text-[12px]">{"</>"}</span>
        <span className="font-semibold">My Works</span>
      </Button>
    </div>
  );
}

export default HeroButtons;