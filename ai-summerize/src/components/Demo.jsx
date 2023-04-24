import { useState, useEffect } from "react"
import {TbPrompt} from "react-icons/tb"

import { copy,tick } from '../assets';
import { useLazyGetSummaryQuery } from "../services/article";

function Demo() {
  const [article, setarticle] = useState(
    {
      url: '',
      summary: '',
    }
  );
  const [allarticle, setallarticle] = useState([]);
  const [copied, setCopied] = useState("");

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };
  const [getsummary, { error, isfetching }] = useLazyGetSummaryQuery();

 


  useEffect(() => {
    const articlesFromlocalstore =
      JSON.parse(localStorage.getItem(article))

    if (articlesFromlocalstore) {
      setallarticle(articlesFromlocalstore)
    }
  },[]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allarticle.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setarticle(existingArticle);


    const { data } = await getsummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updateAllarticle = [newArticle, ...allarticle];

      setarticle(newArticle);
      setallarticle(updateAllarticle);

      console.log(newArticle)

      localStorage.setItem('article', JSON.stringify(updateAllarticle));
    }

  }


  return (
    <section className="mt-16 w-full ">
      <div className="flex flex-col w-full gap-2  justify-center">
        <form 
        className="relative flex justify-center items-center"
          onSubmit={handleSubmit}>

          <input className=" flex justify-center w-full rounded-md border border-gray-200 bg-white py-2.5
           pl-10
           pr-10 text-sm shadow-lg font-satoshi font-medium 
            focus:border-black focus:outline-none focus:ring-0;" type="url" placeholder="Enter Url"
            value={article.url}

            onChange={(e) => {
              setarticle({ ...article, url: e.target.value })
            }} required></input>

          <button type="submit" className=" hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border
           border-gray-200 font-sans text-sm font-medium text-gray-400;"><TbPrompt className="text-3xl text-green-500"/></button>
           
        </form>
        <p className="text-2xl flex justify-center font-light">History↵</p>

        {/* history  */}
 
      </div>
      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
       
      {allarticle.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setarticle(item)}
              className='p-3 flex justify-start items-center flex-row bg-white border
               border-gray-200 gap-3 rounded-lg cursor-pointer'
            >
              <div className=' w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] 
              backdrop-blur flex justify-center items-center cursor-pointer' onClick={() => handleCopy(item.url)}>
                <img
                 src={copied === item.url ? tick : copy}
                  
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
         

        </div>

      {/* results */}

      <div className=" mt-1 p-5">
        {isfetching ? (
          // <img src={loader} alt="loader" className="w-20 h-20 object-contain"/>
          <p>Loading...</p>

        ):error?(
          <p className="font-inter font-bold
           text-black
           text-center">Well,that was not suppose to happen
           <br/><span className=" font-light text-gray-500">{error?.data?.error}</span>
           </p>
        ):(
          article.summary &&(
            <div className="flex flex-col gap-0 p-5 ">
                <h2>
                  Article <span className="font-black bg-gradient-to-r
                   from-blue-600 to-cyan-600 
                   bg-clip-text text-transparent">Summary</span>
                </h2>

                <div className="rounded-xl border border-gray-200 bg-white/20
                 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4">
                  <p className="font-inter text-gray-500 font-medium ">{article.summary}</p>

                  </div>
              </div>
          )
        )}


      </div>

    </section>
  )
}

export default Demo
