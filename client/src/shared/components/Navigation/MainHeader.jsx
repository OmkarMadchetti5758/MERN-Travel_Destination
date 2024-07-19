// import './MainHeader.css'

export default function MainHeader(props) {
  return (
    <header className="w-full h-16 bg-cyan-950 flex items-center fixed top-0 left-0 shadow-slate-950 px-3 py-10 z-100 md:justify-between">
      {props.children}
    </header>
  );
}
