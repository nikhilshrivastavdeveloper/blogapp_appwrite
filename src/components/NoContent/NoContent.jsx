function NoContent(){
  return (
    <div className="max-w-md mx-auto flex flex-col justify-center">
      <img src="../../images/no_content.webp" className="h-[50%] mx-auto"/>
      <h1 className="text-center">We couldn’t find any blog posts. Please check back later!</h1>
    </div>
  )
}

export default NoContent