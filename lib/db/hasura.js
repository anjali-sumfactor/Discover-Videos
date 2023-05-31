// async function queryHasuraQL(operationsDoc, operationName, variables) {
//     const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL
//         ,
//         {
//             method: "POST",
//             headers: {
//                 Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuamFsaSIsImlhdCI6MTY4NTQyNDUyNiwiZXhwIjoxNjg2MDI5NDMxLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoibm90YW5qYWxpIn19.DkYVI6C_66AlgbpVG7qXnJzH4hYJO4l-D-teoqlNWuM",
//             },
//             body: JSON.stringify({
//                 query: operationsDoc,
//                 variables: variables,
//                 operationName: operationName
//             })
//         }
//     );

//     return await result.json();
// }

// const operationsDoc = `
//     query MyQuery {
//       users {
//         id
//         email
//         publicAdresss
//         issuer
//       }
//     }
//   `;

// function fetchMyQuery() {
//     return queryHasuraQL(
//         operationsDoc,
//         "MyQuery",
//         {}
//     );
// }

// export async function startFetchMyQuery() {
//     const { errors, data } = await fetchMyQuery();

//     if (errors) {
//         // handle those errors like a pro
//         console.error(errors);
//     }

//     // do something great with this precious data
//     console.log(data);
// }

// startFetchMyQuery();




/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function queryHasuraGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
        process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuamFsaSIsImlhdCI6MTY4NTUxODIzOCwiZXhwIjoxNjg2MTIzMDYzLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoibm90YW5qYWxpIn19.A8qhwMPv87qjQ-jgLffu5LiqYESUp_E8y8hJr6oS-XU"
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}

function fetchMyQuery() {
    const operationsDoc = `
    query MyQuery {
        users {
            email
            id
            issuer
            publicAddress
        }
    }
`;
    return queryHasuraGraphQL(
        operationsDoc,
        "MyQuery",
        {}
    );
}

export async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();

    if (errors) {
        // handle those errors like a pro
        console.error(errors);
    }

    // do something great with this precious data
    console.log(data);
}

// startFetchMyQuery();