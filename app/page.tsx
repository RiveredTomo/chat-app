


export default function Home() {
  return (
    <body
      className=""
    >

      <main className="flex min-h-screen flex-col justify-between p-24">
        {/* タイムライン */}
        <div
          className=""
        >
          <div
            className=" w-auto"
          >
            <div
              className="bg-primary p-3 rounded-lg"
            >
              <p>Name</p>
              <p>message...message...message...message...message...message...message...</p>
            </div>
            <p
              className=" text-right"
            >yyyy-mm-dd hh:mm:ss</p>
          </div>


        </div>
        {/*  */}
        <div
          className="flex gap-3 w-full"
        >
          <div
            className="join w-full"
          >
            <input type="text"
              className="input input-bordered join-item w-full"
              placeholder="input message..."
            />
            <button
              className='btn btn-primary join-item'
            >投稿</button>
          </div>
          <button
            className="btn btn-secondary"
          >
            なんかボタン
          </button>
        </div>
      </main>
    </body>
  )
}
