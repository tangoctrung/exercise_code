export function filterDataNoti(data:any[]) {
    // let data1: any[] = data.filter((item:any) => item?.moreInfo !== undefined && item?.moreInfo !== '' && item?.moreInfo !== null && item?.type === 1)
    // console.log("data1: ", data1);
    // console.log("data: ", data);

    data.forEach((item:any) => {
        if (item?.moreInfo) {
            item.moreInfo = JSON.parse(item.moreInfo)
        }
        console.log(`item: ${item}`);
    });

    return data;
}