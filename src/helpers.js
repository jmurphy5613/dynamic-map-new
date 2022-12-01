import { icons } from './globals'

function getBoundary() {
    return {
        geometry: {
            coordinates: [
                [
                    [-81.67318297236474, 41.49847051355391],
                    [-81.67261247763194, 41.49835199633162],
                    [-81.67246256660678, 41.49834575857702],
                    [-81.67227934202127, 41.49835823408554],
                    [-81.6684939085585, 41.49876807913711],
                    [-81.66671569485732, 41.49896786021412],
                    [-81.66423714097736, 41.49908358401191],
                    [-81.65870596612154, 41.49968699849023],
                    [-81.65341443251032, 41.50026843349664],
                    [-81.65259996427812, 41.50036265951451],
                    [-81.6517705727165, 41.50056620804435],
                    [-81.64420307835398, 41.50056919715027],
                    [-81.63949411364977, 41.50043782628725],
                    [-81.63346322257908, 41.500122474412564],
                    [-81.63354563772923, 41.506060448369055],
                    [-81.63634787712361, 41.50607542286747],
                    [-81.63954829116395, 41.5059589533187],
                    [-81.64111730609254, 41.50600868837918],
                    [-81.6444391176612, 41.506400748073645],
                    [-81.64692835136722, 41.50669033511102],
                    [-81.64811930583299, 41.506694005686455],
                    [-81.64932781675982, 41.506530620786776],
                    [-81.65037932146096, 41.50629439886197],
                    [-81.65178789268597, 41.50615718113906],
                    [-81.6518663497913, 41.508319318017385],
                    [-81.65183702944665, 41.51228134755249],
                    [-81.65184417986302, 41.51267461859416],
                    [-81.65687788329815, 41.51124291054933],
                    [-81.67100514120733, 41.507222045691805],
                    [-81.67004655695524, 41.50419774011965],
                    [-81.66983506864418, 41.50351442225221],
                    [-81.66974807402732, 41.50312219297902],
                    [-81.66973065285431, 41.50234502910877],
                    [-81.66982792083456, 41.5016032328177],
                    [-81.67021427839524, 41.500785530442414],
                    [-81.67059904243396, 41.5002374497615],
                    [-81.6712889402465, 41.499568671880354],
                    [-81.67220185091811, 41.49894413557922],
                    [-81.67265509428401, 41.498708442471326],
                    [-81.67318297236474, 41.49847051355391],
                ],
            ],
            type: "Polygon",
        },
        type: "Feature",
        properties: {},
    };
}

export { getBoundary };

function generateSampleData() {
    const minLng = 41.4973;
    const maxLng = 41.5119;
    const minLat = -81.681;
    const maxLat = -81.634;

    let points = {};
    let comments = {};
    let replies = {};

    const iconTypes = ["climate", "accessibility", "vibrancy", "community", "engagement"];
    const bys = [
        "Jane Smith",
        "Zoe Patel",
        "Nick Jones",
        "Eric Green",
        "Trisha Stone",
        "Anonymous",
    ];
    const dates = [
        "2020-07-21T16:47:33",
        "2020-07-24T16:47:33",
        "2020-07-27T16:47:33",
        "2020-07-25T16:47:33",
        "2020-07-26T16:47:33",
        "2020-07-28T16:47:33",
        "2020-07-22T16:47:33",
    ];
    const texts = [
        "Lorem in fugit neque",
        "Lorem ipsum dolor sit amet.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, porro.",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus placeat amet error?",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis maiores omnis iste autem error voluptas voluptates fuga corrupti officiis excepturi nisi aliquid, doloribus qui.",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident libero ab reiciendis nobis recusandae delectus quos hic nisi sunt ipsa voluptates eum tenetur dolorem facere eaque, nostrum excepturi deleniti saepe? Rerum.",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, magnam odio! Veritatis alias voluptates quidem, totam quasi hic. Ea at sint ipsa, ut vitae voluptates esse voluptatem tempore labore dolores doloremque odit eius obcaecati ducimus placeat, nostrum aliquam quo quisquam quibusdam, officiis corrupti. Pariatur in, expedita quae eos sequi nisi!",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. In fugit neque voluptates similique labore veritatis, laudantium architecto, incidunt assumenda iste suscipit? Quae, repudiandae exercitationem velit temporibus numquam debitis. Eum, doloremque? Delectus explicabo blanditiis quaerat at, nihil, fuga nostrum tempore distinctio, voluptate beatae tenetur odio aut provident illum est. Veniam maiores, dicta, non explicabo quaerat nobis sunt voluptates aliquid modi consequuntur dolores iure magni! Similique suscipit cum, veritatis voluptates aspernatur quo molestiae fuga ipsa aliquid illum rem aliquam iste quidem quae?",
    ];
    const flip = [true, false];

    for (let i = 0; i < 5; i++) {
        const uid = "_" + Math.random().toString(36).substr(2, 9);
        let iconType = iconTypes[Math.floor(Math.random() * iconTypes.length)];
        points[uid] = {
            lat: Math.random() * (maxLat - minLat) + minLat,
            lng: Math.random() * (maxLng - minLng) + minLng,
            type: iconType,
        };

        let featured = false;
        if (i % 5 === 0) {
            featured = true;
        }

        let text = texts[Math.floor(Math.random() * texts.length)];
        let by = bys[Math.floor(Math.random() * bys.length)];
        let date = dates[Math.floor(Math.random() * dates.length)];
        let live = flip[Math.floor(Math.random() * flip.length)];
        let work = flip[Math.floor(Math.random() * flip.length)];
        let visit = flip[Math.floor(Math.random() * flip.length)];

        comments[uid] = {
            comment: text,
            submittedOn: date,
            commentBy: by,
            neighboorhood: "Northside",
            live: live,
            work: work,
            visit: visit,
            hidden: false,
            upvote: 0,
            featured: featured,
            type: iconType,
        };

        if (featured) {
            replies[uid] = {
                1: {
                    comment: "Saepe corporis eum voluptate.",
                    submittedOn: "2020-07-23T11:11:11",
                    commentBy: bys[Math.floor(Math.random() * bys.length)],
                    neighboorhood: "Midtown",
                    live: flip[Math.floor(Math.random() * flip.length)],
                    work: flip[Math.floor(Math.random() * flip.length)],
                    visit: flip[Math.floor(Math.random() * flip.length)],
                    hidden: false,
                    upvote: -5,
                },
                2: {
                    comment:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, aliquid voluptas consectetur sit amet repellendus sunt impedit perspiciatis est et sequi earum quas quo excepturi incidunt necessitatibus accusantium obcaecati at!",
                    submittedOn: "2020-07-25T12:12:12",
                    commentBy: bys[Math.floor(Math.random() * bys.length)],
                    neighboorhood: "Midtown",
                    live: flip[Math.floor(Math.random() * flip.length)],
                    work: flip[Math.floor(Math.random() * flip.length)],
                    visit: flip[Math.floor(Math.random() * flip.length)],
                    hidden: false,
                    upvote: 15,
                },
            };
        }
    }

    return { points: points, comments: comments, replies: replies };
}

export { generateSampleData };

// function uid() {
//     // Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
//     return "_" + Math.random().toString(36).substr(2, 9);
// }

function getIcons() {
    return icons
}

export { getIcons };

function getRelationshipText(live, work, visit) {
    let shipText = "";
    if (live && work && visit) {
        shipText = "Lives in, works in, visits Medford";
    } else if (live && work && !visit) {
        shipText = "Lives and works in Medford";
    } else if (live && !work && visit) {
        shipText = "Lives in and visits Medford";
    } else if (!live && work && visit) {
        shipText = "Works in and visits Medford";
    } else if (live) {
        shipText = "Lives in Medford";
    } else if (work) {
        shipText = "Works in Medford";
    } else if (visit) {
        shipText = "Visits Medford";
    }
    return shipText;
}

export { getRelationshipText };
