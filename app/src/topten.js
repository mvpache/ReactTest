const getTopTen = (data) => {
  const topTen = [];
  //iterate through data set
    //if topTen is empty, add the first piece of data

    //if topTen is less than 10
      //iterate through topTen
        //is Child greater than or equal to TopChild?
          //is this the last index?
            //push the child onto TopTen

          //is less or equal to the next one?
            //splice it here and return

          //if greater than the next one, keep moving to next topChild
        
        //if child is less than top child TopTen is not full and being the smaller than the first index warrants a .unshift()


    //if topTen is 10 long
      //iterate through topTen
        //is Child greater than or equal to TopChild?
          //is this the last index?
            //pop then push the child onto TopTen

          //is less or equal to the next one?
              //splice it here and return

          //if greater than the next one, keep moving to next topChild

        //if child is less than top child TopTen is full and this Child has not earned a spot

} 