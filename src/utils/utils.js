class Helper {

    // Simple function
    static printSum = (a, b) => {
      return a + b
    }

    // Add to object another object
    // https://gomakethings.com/how-to-add-a-new-item-to-an-object-at-a-specific-position-with-vanilla-js/
    // addToObject(lunch, 'dessert', 'cookie'); -> original array, key, value, (opt) index for replacing
    static addToObject = (obj, key, value, index) => {
        // Create a temp object and index variable
        var temp = {}
        var i = 0
        // Loop through the original object
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                // If the indexes match, add the new item
                if (i === index && key && value) {
                    temp[key] = value
                }
                // Add the current item in the loop to the temp obj
                temp[prop] = obj[prop]
                // Increase the count
                i++
            }
        }
        // If no index, add to the end
        if (!index && key && value) {
            temp[key] = value
        }
        return temp
    }

    static calculateGridRows = ( n ) => {
        let rows
        switch(true){
            case ( n >= 0 && n <= 7 ): {
                rows = 1
                break
            }
            case ( n >= 8 && n <= 14 ): {
                rows = 2
                break
            }
            case ( n >= 15 && n <= 21 ): {
                rows = 3
                break
            }
            case ( n >= 22 && n <= 28 ): {
                rows = 4
                break
            }
            case ( n >= 29 && n <= 35 ): {
                rows = 5
                break
            }
            case ( n >= 36 && n <= 42 ): {
                rows = 6
                break
            }
            case ( n >= 43 && n <= 49 ): {
                rows = 7
                break
            }
            default:
                rows = 7
                break
        }
        return rows
    }
}
export default Helper
