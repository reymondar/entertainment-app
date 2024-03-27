export type FormField = {
   name: 'username' | 'password',
   label: string,
   type: string
}

export type FormProps = {
   type: string,
   items: FormField[]
}

export type MoviesQuery = {
   title: string,
   original_title: string,
   popularity: number,
   poster_path: string,
   vote_average: number,
   release_date: string,
   id: string,
   internal: {
     type: string
   }
 }

export type SeriesQuery = {
   name: string,
   original_name: string,
   popularity: number,
   poster_path: string,
   vote_average: number,
   first_air_date: string,
   id: string,
   internal: {
     type: string
   }
 }