
import useAuth from "./hooks/useAuth";
import App from "./App";

function Background() {
  const {loading} = useAuth()

  if(loading) {
    return (
      <p className="text-4xl text-primary">Loading..</p>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="w-64 h-64 bg-[https://media.istockphoto.com/id/1201074916/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%AA%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%95%E0%B9%89%E0%B8%99%E0%B8%A3%E0%B9%8D%E0%B8%B2%E0%B9%83%E0%B8%99%E0%B9%84%E0%B8%99%E0%B8%97%E0%B9%8C%E0%B8%84%E0%B8%A5%E0%B8%B1%E0%B8%9A%E0%B8%9B%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%95%E0%B8%B5%E0%B9%89%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%AA%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%95.jpg?s=2048x2048&w=is&k=20&c=cgODUQpefFEdne6AUkQ75xwgmNWuwCZTYO9QAkf5XVo=] bg-cover bg-center"></div>
      <App />
    </div>
  );
}

export default Background;
