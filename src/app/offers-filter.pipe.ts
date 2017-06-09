import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offersFilter'
})
export class OffersFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

@Pipe({
  name: 'detailedPlaceIdFilter'
})
export class DetailedPlaceIdFilter implements PipeTransform {

  transform(value: any, args?: any): any {
    let arr = args.split(' ').map((item) => item = Number(item));
    console.log(arr);
    if(arr[0]) {
      return value.filter(item =>  arr.indexOf(item.id)>=0)
    } else {
      return value;
    }
  }

}
@Pipe({
  name: 'moreInfoFilter'
})
export class MoreInfoFilter implements PipeTransform {

  transform(value: any, args: any): any {
    
    if(args.length>0) {
      let array = args.split(',').filter((item)=> item != '');
      let finalArray = [];
      value.filter(item => {
         for(let i = 0; i<array.length; i++) {
             if(item.moreInfo.indexOf(array[i])<0) {
               return false;
             }
         } 
         finalArray.push(item)

      })
      return finalArray
    } else {
      return value;
    }
  }

}

@Pipe({
  name: 'offersFilterFeeMin'
})
export class OffersFilterPipeFeeMin implements PipeTransform {

  transform(value: any, args?: any): any {
  	if(args) {
  		return value.filter(item => {
    		return item.monthlyFee > args
    });

  	} else {
  		return value;
      }
  	}

}

@Pipe({
  name: 'offersFilterFeeMax'
})
export class OffersFilterPipeFeeMax implements PipeTransform {
 
  transform(value: any, args?: any): any {
  	if(args) {
  		return value.filter(item => {
    		return item.monthlyFee < Number(args)
    });

  	} else {
  		return value;
      }
  	}

}
@Pipe({
  name: 'offersFilterDepositMin'
})
export class OffersFilterPipeDepositMin implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args) {
      return value.filter(item => {
        return item.deposit > args
    });

    } else {
      return value;
      }
    }

}
@Pipe({
  name: 'offersFilterDepositMax'
})
export class OffersFilterPipeDepositMax implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args) {
      return value.filter(item => {
        return item.deposit < args
    });

    } else {
      return value;
      }
    }

}
@Pipe({
  name: 'offersFilterSqmtMax'
})
export class OffersFilterPipeSqmtMax implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args) {
      return value.filter(item => {
        return item.sqmt < args
    });

    } else {
      return value;
      }
    }

}
@Pipe({
  name: 'offersFilterSqmtMin'
})
export class OffersFilterPipeSqmtMin implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args) {
      return value.filter(item => {
        return item.sqmt > args
    });

    } else {
      return value;
      }
    }

}
@Pipe({
  name: 'offersFilterBuildingType'
})
export class OffersFilterPipeBuildingType implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args) {
      return value.filter(item => {
        return item.buildingType === args
    });

    } else {
      return value;
      }
    }

}
@Pipe({
  name: 'offersFilterRoomsCount'
})
export class OffersFilterPipeRoomsCount implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args) {
      return value.filter(item => {
        return item.roomsCount === args
    });

    } else {
      return value;
      }
    }

}