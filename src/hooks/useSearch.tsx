import React , { useState , useEffect } from "react";
import { MoviesQuery } from "../types";

const useSearch = (list: MoviesQuery[] | null) => {
const [catalog, setCatalog] = useState<MoviesQuery[]| null>(null)
const [search, setSearch] = useState<string | null>(null)

  useEffect(()=>{
   if(list) setCatalog(list.filter((a: MoviesQuery) => search && search?.length > 0 ? a.title?.toLowerCase().includes(search?.trim()) : true))
  },[search])

  return { catalog, search, setSearch }
}

export default useSearch