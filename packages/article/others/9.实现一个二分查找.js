// 9.实现一个二分查找
   function binarySearch(arr, key, start, end){
        if(start > end) return -1;
        var m = Math.ceil((start+end)/2);
        if(arr[m] == key){
            return m;
        }
        if(key < arr[m]){
            return binarySearch(arr, key, 0, m-1);
        }
        else if(key > arr[m]){
            return binarySearch(arr, key, m+1, arr.length-1)
        }
    }

    var arr = [1,2,3,4,5];
    console.log(binarySearch(arr, 6, 0, arr.length-1));
