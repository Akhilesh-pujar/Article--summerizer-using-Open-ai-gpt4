import { useState, useEffect } from "react"
import {TbPrompt} from "react-icons/tb"

import { copy, linkIcon, loader} from '../assets';
import { useLazyGetSummaryQuery } from "../services/article";

function Demo() {
  const [article, setarticle] = useState(
    {
      url: '',
      summary: '',
    }
  );
  const [allarticle, setallarticle] = useState([]);


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
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex justify-center items-center"
          onSubmit={handleSubmit}>
          <img src={linkIcon}
            className="absolute left-0 my-2 ml-3 w-5 " />
          <input className="" type="url" placeholder="Enter Url"
            value={article.url}
            onChange={(e) => {
              setarticle({ ...article, url: e.target.value })
            }} required></input>

          <button type="submit" className=" bg-slate-600"><TbPrompt className="text-3xl text-green-500"/></button>
        </form>

        {/* history  */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allarticle.map((item, index) => {
            <div
              key={`link-${index}`}
              onClick={() => setarticle(item)}
              className="link_card"
            >
              <div className="">
                <img src={copy} className="w-[40%] h-[40%] object-contain" />
              </div>
              <p className="flex-1 font-regular text-amber-500 text-sm truncate">{item.url}</p>

            </div>
          })}

        </div>
      </div>

      {/* results */}

      <div className="my-10 max-w-full flex 
      justify-center items-center">
        {isfetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain"/>

        ):error?(
          <p className="font-inter font-bold
           text-black
           text-center">Well,that was not suppose to happen
           <br/><span className=" font-light text-gray-500">{error?.data?.error}</span>
           </p>
        ):(
          article.summary &&(
            <div className="flex flex-col gap-3">
                <h2>
                  Article <span className="blue_gradient">Summary</span>
                </h2>

                <div className="summary_box">
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
