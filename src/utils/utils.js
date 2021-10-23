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
}
export default Helper
