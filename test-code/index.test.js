const axios2 = require("axios");

const BACKEND_URL = "http://localhost:3000";
const WS_URL = "ws://localhost:3000";

const axios = {
    post : async (...args) => {
        try{
            const response = await axios2.post(...args);
            return response;
        }
        catch(error){
            return error.response;
        }
    },
    put : async (...args) => {
        try{
            const response = await axios2.put(...args);
            return response;
        }
        catch(error){
            return error.response;
        }
    },
    get : async (...args) => {
        try{
            const response = await axios2.get(...args);
            return response;
        }
        catch(error){
            return error.response;
        }
    },
    delete : async (...args) => {
        try{
            const response = await axios2.delete(...args);
            return response;
        }
        catch(error){
            return error.response;
        }
    }
}

// describe("Authentication (Sign up, Login)", () => {
//     test("User can Signup using username and password", async () => {
//         const username = "alam" + Math.random(); 
//         const password = "123456";

//         const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
//             username,
//             password,
//             type : "admin"
//         });

//         expect(response.status).toBe(200);

//         const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
//             username,
//             password,
//             type : "admin"
//         });

//         expect(updatedResponse.status).toBe(400);
//     });

//     test("User can signup fail if User name is empty", async () => {
//         const username = "";
//         const password = "123456";

//         const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
//             username,
//             password,
//             type : "admin"
//         });

//         expect(response.status).toBe(400);
//     });
    
//     test("User can Signin with correct username and password", async () => {
//         // first signup
//         const username = "alam" + Math.random();
//         const password = "123456";

//         await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
//             username,
//             password,
//             type : "admin"
//         });

//         // then signin
//         const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin` , {
//             username,
//             password
//         });

//         expect(response.status).toBe(200);
//         expect(response.data.token).toBeDefined();
//     });

//     test("User can Signin with incorrect username and password", async () => {
//         const username = "alam" + Math.random();
//         const password = "123456";

//         await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
//             username,
//             password,
//             type : "admin"
//         });

//         const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin` , {
//             username : "wrongPassword",
//             password
//         });

//         expect(response.status).toBe(400);
//     });
// });

// describe("User metadata EndPoint", () => {
//     let token;
//     let avatarId ;

//     beforeAll( async () => {
//         const username = "alam" + Math.random();
//         const password = "123456";

//         await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
//             username,
//             password,
//             type : "admin"
//         });

//         // console.log(response1);

//         const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin` , {
//             username,
//             password
//         });

//         // console.log(response.data);

//         token = response.data.token;
//         // console.log("token", token);

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
// 	        "name": "Timmy"
//         } , {
//             headers : {
//                 "authorization" : `Bearer ${token}`
//             }
//         });

//         console.log(avatarResponse.data);
//         avatarId = avatarResponse.data.avatarId ;
//         // console.log(avatarId);
//         console.log(avatarId);
//     });

//     test("User can update their metadata with a wrong avatar Id", async () => {
//         const response = await axios.put(`${BACKEND_URL}/api/v1/user/meta-data` , {
//             avatarId : "123456789"
//         }, {
//             headers : {
//                "authorization" : `Bearer ${token}`
//             }
//         }); 

//         expect(response.status).toBe(400);
//     });

//     test("User can update their metadata with correct avatar Id", async () => {
//         const response = await axios.put(`${BACKEND_URL}/api/v1/user/meta-data` , {
//             avatarId : avatarId
//         }, {
//             headers : {
//                 "authorization" : `Bearer ${token}`
//             }
//         }); 
        
//         expect(response.status).toBe(200);
//     });

//     test("User is not able to update their metadata if the auth header is not present", async () => {
//         const response = await axios.put(`${BACKEND_URL}/api/v1/user/meta-data`, {
//             avatarId
//         })

//         console.log(response.data);
//         console.log(response.status);
//         expect(response.status).toBe(403)
//     })
// });

// describe("User avatar information", () => {
//     let avatarId ; 
//     let token ;
//     let userId ; 

//     beforeAll( async () => {
//         const username = "alam" + Math.random();
//         const password = "123456";

//         const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
//             username,
//             password,
//             type : "admin"
//         }); 

//         userId = signupResponse.data.userId ;

//         const signinResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signin` , {
//             username,
//             password
//         });

//         token = signinResponse.data.token ; 

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
// 	        "name": "Timmy"
//         } , {
//             headers : {
//                 authorization : `Bearer ${token}`
//             }
//         });

//         avatarId = avatarResponse.data.avatarId ;
//     });

//     test("User can get their avatar information", async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/user/avatars`);
//         expect(response.data.avatars.length).not.toBe(0);
//         const currentAvatar = response.data.avatars.find(x => x.id === avatarId);
//         expect(currentAvatar).toBeDefined();
//     }); 

//     test("Get back avatar information for a user", async () => {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/user/meta-data/bulk?ids=[${userId}]`);
//         expect(response.data.avatars.length).toBe(1);
//         expect(response.data.avatars[0].userId).toBe(userId);
//     })
// })

describe("Spaces Information", () => {
    let mapId;
    let element1Id;
    let element2Id;
    let adminToken;
    let adminId;
    let userToken;
    let userId;

    beforeAll( async () => {
        const username = "alam" + Math.random();
        const password = "123456";

        const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
            username,
            password,
            type : "admin"
        });
        
        // console.log(signupResponse.data);   
        adminId = signupResponse.data.userId ;
        // console.log("Admin Id - ", adminId);

        const signinResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signin` , {
            username,
            password
        });

        // console.log(signinResponse.data);
        adminToken = signinResponse.data.token ;
        // console.log("Admin Token - ", adminToken);

        const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
            username : username + "-user",
            password,
            type : "user"
        });

        // console.log(userSignupResponse.data);
        userId = userSignupResponse.data.userId ;
        // console.log("User Id - ", userId);

        const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signin` , {
            username : username + "-user",
            password
        });

        // console.log(userSigninResponse.data);
        userToken = userSigninResponse.data.token ;
        // console.log("User Token - ", userToken);

        const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
            "static": true
        }, {
            headers : {
                authorization : `Bearer ${adminToken}`
            }
        })

        // console.log(element1Response.data);
        element1Id = element1Response.data.id ;
        // console.log("Element 1 Id - ", element1Id);

        const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
            "static": true 
        }, {
            headers : {
                authorization : `Bearer ${adminToken}`
            }
        })
        
        // console.log(element2Response.data);
        element2Id = element2Response.data.id ;
        // console.log("Element 2 Id - ", element2Id);

        const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
            "thumbnail": "https://thumbnail.com/a.png",
            "dimensions": "100x200",
            "name": "100 person interview room",
            "defaultElements": [{
                    elementId: element1Id,
                    x: 20,
                    y: 20
                }, {
                    elementId: element1Id,
                    x: 18,
                    y: 20
                }, {
                    elementId:  element2Id,
                    x: 19,
                    y: 20
                }
            ]
        }, {
            headers : {
                authorization : `Bearer ${adminToken}`
            }
        }); 
        // console.log(mapResponse.data);
        mapId = mapResponse.data.id ;
        // console.log("Map Id - ", mapId);
    })

    // Done 
    test("User able to create a space", async () => {

        const response = await axios.post(`${BACKEND_URL}/api/v1/space/create`, {
            "name" : "Test",
            "dimensions" : "100x200",
            "mapId" : mapId
        }, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        })

        expect(response.status).toBe(200);
        expect(response.data.spaceId).toBeDefined();
    }); 

    // Done
    test("User able to create a space without mapId (empty space)", async () => {
        console.log("Reach here - 01");
        const response = await axios.post(`${BACKEND_URL}/api/v1/space/create`, {
            "name" : "Test",
            "dimensions" : "100x200"
        }, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        }); 

        console.log("Reach here - 02");
        console.log(response.data);

        // console.log(response.status);
        // console.log(response.data);

        expect(response.data.spaceId).toBeDefined();
    }); 

    // Done
    test("User not able to create a space without mapId and dimension (empty space)", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space/create`, {
            "name" : "Test"
        }, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });
        expect(response.status).toBe(400);
    });

    // Done
    test("User is not able to delete a space that doesn't exist", async () => {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/space/${"123456789"}`, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });

        expect(response.status).toBe(404);
    })

    // Done
    test("User is able to delete a space that exists", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space/create`, {
            "name" : "Test",
            "dimensions" : "100x200",
        }, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        })

        console.log(response.data);

        const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });

        console.log(deleteResponse.data);

        expect(deleteResponse.status).toBe(200);
    });

    // Done
    test("User is should not be able to delete a space created by another user", async () => {
        const response =  await axios.post(`${BACKEND_URL}/api/v1/space/create`, {
            "name" : "Test",
            "dimensions" : "100x200",
        } , {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });

        const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
            headers : {
                authorization : `Bearer ${adminToken}`
            }
        });

        expect(deleteResponse.status).toBe(403);
    })

    // Done
    test("admin hash no space initially", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
            headers : {
                authorization : `Bearer ${adminToken}`
            }
        });
        expect(response.data.spaces.length).toBe(0);
    });

    // Done 
    test("admin has gets one space after creation", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space/create`, {
            "name" : "Test",
            "dimensions" : "100x200",
        }, {
            headers : {
                authorization : `Bearer ${adminToken}`
            }
        });

        const response2 = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
            headers : {
                authorization : `Bearer ${adminToken}`
            }
        });
        const filterSpace = response2.data.spaces.find(x => x.spaceId === response.data.spaceId);
        expect(response2.data.spaces.length).toBe(1);
        expect(filterSpace).toBeDefined();
    })
})

describe("Arena endPoints" , () => {
    let mapId;
    let element1Id;
    let element2Id;
    let adminToken;
    let adminId;
    let userToken;
    let userId;
    let spaceId;

    beforeAll( async () => {
        const username = "alam" + Math.random();
        const password = "123456";

        const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
            username,
            password,
            type : "admin"
        });

        adminId = signupResponse.data.userId ;

        const signinResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signin` , {
            username,
            password
        });

        adminToken = signinResponse.data.token ;

        const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
            username : username + "-user",
            password,
            type : "user"
        });

        userId = userSignupResponse.data.userId ;

        const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signin` , {
            username : username + "-user",
            password
        });

        userToken = userSigninResponse.data.token ;

        const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
            "static": true
        }, {
            headers : {
                authorization : `Bearer ${adminToken}`
            }
        });

        const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {   
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
            "static": true 
        }, {
            headers : {
                authorization : `Bearer ${adminToken}`
            }
        });

        element1Id = element1Response.data.elementId ;
        element2Id = element2Response.data.elementId ;

        const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
            "thumbnail": "https://thumbnail.com/a.png",
            "dimensions": "100x200",
            "name": "100 person interview room",
            "defaultElements": [{
                    elementId: element1Id,
                    x: 20,
                    y: 20
                }, {
                    elementId: element1Id,
                    x: 18,
                    y: 20
                }, {
                    elementId:  element2Id,
                    x: 19,
                    y: 20
                }
            ]
        }, {
            headers : {
                authorization : `Bearer ${adminToken}`
            }
        });

        mapId = mapResponse.data.id ;

        const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space/create`, {
            "name" : "Test",
            "dimensions" : "100x200",
            "mapId" : mapId
        }, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });

        spaceId = spaceResponse.data.spaceId ;
    });
    
    // Done
    test("Incorrect spaceId should return 404", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/space/:${"123456789"}`, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });
        expect(response.status).toBe(404);
    });

    // Fails
    test("Correct spaceId return all the elements", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });
        console.log(response.data);
        expect(response.status).toBe(200);
        expect(response.data.dimensions).toBe("100x200");
        expect(response.data.length).toBe(3);
    });

    test("Delete EndPoints is able to delete an element", async () => {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
            headers : {
                "authorization" : `Bearer ${userToken}`
            }
        });

        let res = await axios.delete(`${BACKEND_URL}/api/v1/space/element`, {
            headers : {
                "authorization" : `Bearer ${userToken}`
            }
        });

        const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });

        expect(response.status).toBe(200);
        expect(newResponse.data.elements.length).toBe(2)
    })

    test("Adding an element fails if the element lies outside the dimensions", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
            "static": true,
            "x": 100,
            "y": 100
        }, {    
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });
        expect(response.status).toBe(400);
    });

    test("Adding an element works if the element lies inside the dimensions", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/element`, {
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
            "static": true,
            "x": 10,
            "y": 10
        }, {    
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });

        const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
            headers : {
                authorization : `Bearer ${userToken}`
            }
        });

        expect(response.status).toBe(201);
        expect(newResponse.data.elements.length).toBe(3);
    });
});

// describe("Admin EndPoints", () => {
//     let adminToken;
//     let adminId;
//     let userToken;
//     let userId;

//     beforeAll( async () => {
//         const username = "alam" + Math.random();
//         const password = "123456";

//         const signinResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, {
//             username,
//             password,
//             type : "admin"
//         });

//         // console.log("admin response", signinResponse);

//         adminId = signinResponse.data.userId ;

//         const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin` , {
//             username,
//             password
//         });

//         // console.log("Admin signin response", response);

//         adminToken = response.data.token ;

//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signup` , {
//             username : username + "-user",
//             password,
//             type : "user"
//         });

//         // console.log("user signup response", userSignupResponse);

//         userId = userSignupResponse.data.userId ;

//         const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signin` , {
//             username : username + "-user",
//             password
//         });

//         // console.log("user signin response", userSigninResponse);

//         userToken = userSigninResponse.data.token ;
//     });

//     test("User is not able to able to hit admin Endpoints", async () => {

//         const elementResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true
//         }, {
//             headers : {
//                 authorization : `Bearer ${userToken}`
//             }
//         });

        
//         // console.log("Element Response", elementResponse.data);

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name" : "Test space",
//             defaultElements: []
//         }, {
//             headers : {
//                 authorization : `Bearer ${userToken}`
//             }
//         }); 

//         // console.log("map response", mapResponse.data);

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//             "name": "Timmy"
//         }, {
//             headers : {
//                 authorization : `Bearer ${userToken}`
//             }
//         });

//         // console.log("avatar response", avatarResponse.data);

//         const updateElementResponse = await axios.put(`${BACKEND_URL}/api/v1/admin/element/123`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         }, {
//             headers: {
//                 "authorization": `Bearer ${userToken}`
//             }
//         })

//         // console.log("Update element response", updateElementResponse.data);

//         expect(elementResponse.status).toBe(403)
//         expect(mapResponse.status).toBe(403)
//         expect(avatarResponse.status).toBe(403)
//         expect(updateElementResponse.status).toBe(403)
//     });

//     test("Admin is able to hit admin Endpoints", async () => {

//         const elementReponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//           "static": true
//         }, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         });

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "name": "Space",
//             "dimensions": "100x200",
//             "defaultElements": []
//          }, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//             "name": "Timmy"
//         }, {
//             headers: {
//                 "authorization": `Bearer ${adminToken}`
//             }
//         })

//         expect(elementReponse.status).toBe(200)
//         expect(mapResponse.status).toBe(200)
//         expect(avatarResponse.status).toBe(200)
//     })

//     test("Admin is able to update the imageUrl for an element", async () => {
//         const elementResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//           "static": true
//         }, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         });

//         const updateElementResponse = await axios.put(`${BACKEND_URL}/api/v1/admin/element/${elementResponse.data.id}`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         }, {
//             headers: {
//                 "authorization": `Bearer ${adminToken}`
//             }
//         })

//         expect(updateElementResponse.status).toBe(200);

//     })

// })


// describe("Websocket tests", () => {
//     let adminToken;
//     let adminUserId;
//     let userToken;
//     let adminId;
//     let userId;
//     let mapId;
//     let element1Id;
//     let element2Id;
//     let spaceId;
//     let ws1; 
//     let ws2;
//     let ws1Messages = []
//     let ws2Messages = []
//     let userX;
//     let userY;
//     let adminX;
//     let adminY;

//     function waitForAndPopLatestMessage(messageArray) {
//         return new Promise(resolve => {
//             if (messageArray.length > 0) {
//                 resolve(messageArray.shift())
//             } else {
//                 let interval = setInterval(() => {
//                     if (messageArray.length > 0) {
//                         resolve(messageArray.shift())
//                         clearInterval(interval)
//                     }
//                 }, 100)
//             }
//         })
//     }

//     async function setupHTTP() {
//         const username = "alam" + Math.random()
//         const password = "123456"
//         const adminSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username,
//             password,
//             type: "admin"
//         })

//         const adminSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username,
//             password
//         })

//         adminUserId = adminSignupResponse.data.userId;
//         adminToken = adminSigninResponse.data.token;
        
//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username: username + `-user`,
//             password,
//             type: "user"
//         })
    
//         const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username: username + `-user`,
//             password
//         })

//         userId = userSignupResponse.data.userId
//         userToken = userSigninResponse.data.token

//         const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//             "static": true
//         }, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         });

//         const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//             "width": 1,
//             "height": 1,
//              "static": true
//         }, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         element1Id = element1Response.data.id
//         element2Id = element2Response.data.id

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://thumbnail.com/a.png",
//             "dimensions": "100x200",
//             "name": "default space",
//             "defaultElements": [{
//                     elementId: element1Id,
//                     x: 20,
//                     y: 20
//                 }, {
//                   elementId: element1Id,
//                     x: 18,
//                     y: 20
//                 }, {
//                   elementId: element2Id,
//                     x: 19,
//                     y: 20
//                 }
//             ]
//          }, {
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         mapId = mapResponse.data.id

//         const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
//             "name": "Test",
//             "dimensions": "100x200",
//             "mapId": mapId
//         }, {headers: {
//             "authorization": `Bearer ${userToken}`
//         }})

//         console.log(spaceResponse.status)
//         spaceId = spaceResponse.data.spaceId
//     }

//     async function setupWs() {
//         ws1 = new WebSocket(WS_URL)

//         ws1.onmessage = (event) => {
//             console.log(event.data)
            
//             ws1Messages.push(JSON.parse(event.data))
//         }

//         await new Promise(r => {
//           ws1.onopen = r
//         })

//         ws2 = new WebSocket(WS_URL)

//         ws2.onmessage = (event) => {
//             ws2Messages.push(JSON.parse(event.data))
//         }
        
//         await new Promise(r => {
//             ws2.onopen = r  
//         })
//     }
    
//     beforeAll(async () => {
//         await setupHTTP()
//         await setupWs()
//     })

//     test("Get back ack for joining the space", async () => {
//         ws1.send(JSON.stringify({
//             "type": "join",
//             "payload": {
//                 "spaceId": spaceId,
//                 "token": adminToken
//             }
//         }))

//         const message1 = await waitForAndPopLatestMessage(ws1Messages);

//         ws2.send(JSON.stringify({
//             "type": "join",
//             "payload": {
//                 "spaceId": spaceId,
//                 "token": userToken
//             }
//         }))
        

//         const message2 = await waitForAndPopLatestMessage(ws2Messages);
//         const message3 = await waitForAndPopLatestMessage(ws1Messages);

//         expect(message1.type).toBe("space-joined")
//         expect(message2.type).toBe("space-joined")
//         expect(message1.payload.users.length).toBe(0)
//         expect(message2.payload.users.length).toBe(1)
//         expect(message3.type).toBe("user-joined");
//         expect(message3.payload.x).toBe(message2.payload.spawn.x);
//         expect(message3.payload.y).toBe(message2.payload.spawn.y);
//         expect(message3.payload.userId).toBe(userId);

//         adminX = message1.payload.spawn.x
//         adminY = message1.payload.spawn.y

//         userX = message2.payload.spawn.x
//         userY = message2.payload.spawn.y
//     })

//     test("User should not be able to move across the boundary of the wall", async () => {
//         ws1.send(JSON.stringify({
//             type: "move",
//             payload: {
//                 x: 1000000,
//                 y: 10000
//             }
//         }));

//         const message = await waitForAndPopLatestMessage(ws1Messages);
//         expect(message.type).toBe("movement-rejected")
//         expect(message.payload.x).toBe(adminX)
//         expect(message.payload.y).toBe(adminY)
//     })

//     test("User should not be able to move two blocks at the same time", async () => {
//         ws1.send(JSON.stringify({
//             type: "move",
//             payload: {
//                 x: adminX + 2,
//                 y: adminY
//             }
//         }));

//         const message = await waitForAndPopLatestMessage(ws1Messages);
//         expect(message.type).toBe("movement-rejected")
//         expect(message.payload.x).toBe(adminX)
//         expect(message.payload.y).toBe(adminY)
//     })

//     test("Correct movement should be broadcasted to the other sockets in the room",async () => {
//         ws1.send(JSON.stringify({
//             type: "move",
//             payload: {
//                 x: adminX + 1,
//                 y: adminY,
//                 userId: adminId
//             }
//         }));

//         const message = await waitForAndPopLatestMessage(ws2Messages);
//         expect(message.type).toBe("movement")
//         expect(message.payload.x).toBe(adminX + 1)
//         expect(message.payload.y).toBe(adminY)
//     })

//     test("If a user leaves, the other user receives a leave event", async () => {
//         ws1.close()
//         const message = await waitForAndPopLatestMessage(ws2Messages);
//         expect(message.type).toBe("user-left")
//         expect(message.payload.userId).toBe(adminUserId)
//     })
// })/