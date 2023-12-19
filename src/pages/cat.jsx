import { useContext } from "react"
import { useCats } from "./angel"
import _ from "lodash"



const Cat = () => {
    // const cats = useContext(CatContext)
    const {catPictures, setCatPictures} = useCats()
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const cat = _.find(catPictures, function(o) { return o._id === id; });
    return (
        <div className="col-span-10 mt-10">
            {cat ? (
                <div>
                    <div>
                        Cat ID: {cat._id}
                    </div>
                    <div>
                        Size: {cat.size}
                    </div>
                    <div>
                        Created At: {cat.createdAt}
                    </div>
                    {cat.updatedAt ? (
                        <div>
                            Updated At: {cat.updatedAt}
                        </div>
                    ) : (
                        null
                    )}
                    
                    {cat.tags && cat.tags.length > 0 ? (
                        <div>
                            Tags: {cat.tags.map( (value, index) => {
                                return value + " "
                            })}
                        </div>
                    ): null}
                </div>
            ) : (
                <div>
                    No cat selected
                </div>
            )}
        </div>
    )
}


export default Cat