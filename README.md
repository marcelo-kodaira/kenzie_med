![12](https://user-images.githubusercontent.com/102538748/188499739-b3318b3f-c6f4-4e92-b708-dac8a4a06735.png)


<div style='background-color:white'>

</div>
<h1 style='color: #00A48B'>KenzieMed</h1>
<h2 style='color: #00A48B'>Projeto final do modulo 4 Back-end da Kenzie Academy Brasil</h2>

<p>A kenzieMed é um sistema de agendamento de consultas e exames, facilitando a vida dos médicos 
e usuários. Um sistema fácil e simples de usar, trazendo agilidade na hora de escolher um médico e fazer o agendamento de consulta ou exame,
sem a necessidade de entrar em contato com o teleatendimento, em poucos cliques você já tem sua consulta/exame agendada. </p>

<p>Seguindo com o projeto final Modulo 3 de frontend, <a href="https://github.com/grupo-1-projeto-frontend-t12/Projeto-FrontEnd-M3"> Clique Aqui para conhecer a primeira parte do projeto!.</a> Desenvolvemos o backend da aplicação como requesito para conclusão do modulo 4, o primeiro modulo de backend do curso de formação Web Full Stack da Kenzie Academy Brasil.</p>
 
<p>Nesse projeto foi desenvolvido uma CRUD(Create, Read, Update e delete) seguindo os conceitos de api RestFul, utilizando Typescript, Express, TypeOrm, PostgreSQL, Docker e testes unitários com Jest. </p>
 
<p>Nossa API possui três tipos de usuários: o user comum, doctor e o user administrador que possui maior poder nas rotas, podendo fazer alterações que os outros usuários comuns não pode. </p>

<details>
  <summary><h2>KenzieMED - Documentação da API</h2></summary>
  

A API tem um total de 5 rotas e 24 endpoints.

<table>
  <tr>
    <th>Metodos</th>
    <th>Rota</th>  
  </tr>
  <tr>
    <td>post</td>
     <td>/users</td>      
  </tr>
  <tr>
   <td>patch</td>
    <td>/users</td>   
  </tr>
    <tr>
   <td>delete</td>
    <td>/users/id</td>    
  </tr>
    <tr>
   <td>get</td>
    <td>/users</td>    
  </tr>
    <tr>
   <td>get</td>
    <td>/users/profile</td>    
  </tr>
  </tr>
    <tr>
   <td>post</td>
    <td>/login/doctors</td>    
  </tr>
    <tr>
   <td>login</td>
    <td>/login/users</td>    
  </tr>
  <tr>
    <td>post</td>
     <td>/doctors</td>      
  </tr>
  <tr>
   <td>patch</td>
    <td>/doctors/id</td>   
  </tr>
    <tr>
   <td>delete</td>
    <td>/doctors/id</td>    
  </tr>
    <tr>
   <td>get</td>
    <td>/doctors</td>    
  </tr>
    <tr>
   <td>get</td>
    <td>/users/profile</td>    
  </tr>
   <td>get</td>
    <td>/users/:id</td>    
  </tr>
   <td>get</td>
    <td>/users/:id/schedules</td>    
  </tr>
  <tr>
    <td>post</td>
     <td>/schedules</td>      
  </tr>
  <tr>
   <td>patch</td>
    <td>/schedules/edit/:id</td>   
  </tr>
    <tr>
   <td>patch</td>
    <td>/schedules/:id</td>    
  </tr>
    <tr>
   <td>delete</td>
    <td>/schedules/id</td>    
  </tr>
    <tr>
   <td>get</td>
    <td>/schedules</td>    
  </tr>
    <tr>
   <td>get</td>
    <td>/schedules/doctors</td>    
  </tr>
    <tr>
   <td>get</td>
    <td>/schedules/users</td>    
  </tr>
      <tr>
   <td>post</td>
    <td>/specialties</td>    
  </tr>
    <tr>
   <td>get</td>
    <td>/specialties</td>    
  </tr>
    <tr>
   <td>get</td>
    <td>/specialties/:id/doctors</td>    
  </tr>
</table>

<h2>O url base da API é:</h2>
<h3  style='color: #00A48B'>https://kenziemed-api.herokuapp.com/users</h2>

# ROTA /LOGIN

Responsável por prover autenticação ao usuário.

## POST /login/user
Autenticação: A rota não precisa de autenticação

Request body: 

```
       {
          “email”: “admin@admin.com”,
          “password”: “adm123”
       }
```
	
Response: Status 200 OK 

``` 
     {
        “token”: “eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjY2Mzg3NzMwLCJleHAiOjE2NjY0NzQxMzAsInN1YiI6IjY4OTk2ODVhLWFmZGEtNDFkYS05MmU3LTdkNzY0YjVkMDkwOCJ9.bxA8E2UOv7ZtO_UkTMoHwv104R8ang0uS8HCtfsJ15c"
     }
```

JWT Payload: 

```
     {
        id,
        email,
        isAdmin,
        isActive
     }
```
## POST /login/doctor
Autenticação: A rota não precisa de autenticação

Request body


```
     {
        “email”: “doctor@doctor.com”,
        “password”: “doctor123”
     }
```
	
Response: Status 200 OK 

```
     {
        “token”: “eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjY2Mzg3NzMwLCJleHAiOjE2NjY0NzQxMzAsInN1YiI6IjY4OTk2ODVhLWFmZGEtNDFkYS05MmU3LTdkNzY0YjVkMDkwOCJ9.bxA8E2UOv7ZtO_UkTMoHwv104R8ang0uS8HCtfsJ15c”	
     }
```
	
JWT Payload:

```
    {
        id,
        email,
        isActive
    }
```

### ERRORS   

Email não informado:

Response status: 400 Bad request

Response body:
 
```
     {
        “message”: “email is a required information ”
     }
```


Senha não informada:

Response status: 400 Bad request 

Responde body:
 
```
      {
        “message”: “Password is a required information”
      }
```

Senha e/ou email incorretos:

Response status: 400 Bad request

Response body:
 
```
       {
         “message”: “Invalid email and/or password”
       }
```

Usuário inativo:

Response status: 403 Unauthorized

Response body:

```
     {
        “message”: “User is currently inactive”
     }
```

Médico inativo:

Response status: 403 Unauthorized

Response body:

```
    {
       “message”: “Doctor is currently inactive”
    }
```


# Rota /SPECIALTIES

## POST /specialties
Rota a criação de especialidades com os seguintes dados:
<br>
name: string,
<br>
id: não deve ser passado mas gerado no momento de validação dos dados, deve ser uuidv4;
<br>
Não podem ser cadastradas duas especialidades com o mesmo nome;
<br>
A rota só pode ser acessada por administradores.

FORMATO DE REQUISIÇÃO:



```
        headers: {
                Authorization: Bearer {admin token}
        }

```

Body da requisição:

```
    {
      “name”: “Cardiologia”
    }
     
```

FORMATO DE RESPOSTA:
Response: Status 201 CREATED

```
    {
      “id”: “a127f4f-3703-40ed-820f-84c077b2736e”,
      “name”: “Cardiologia”
    }
```


### ERRORS 

Sem headers de autorização:

Response Status: 401 Unauthorized

Response body:

```
    {        
        message: “Missing authorization headers”
    }
```
Requisição sem ser um Doctor ou Administrador:

Response status: 403 Forbidden

Response body: 

```
    {
        message: “Unauthorized! Need admin ou doctor credential ”
    }
```
Token inválido:

Response status: 403 Forbidden

Response body:

```
    {
        message: “Invalid Token”
    }
```
Specialty com nome já existente

Response status: 400 bad request

Response body:

```
    {
        message: “Specialty name already exist”
    }
```



## GET /specialties

Lista todas as especialidades;

A rota não precisa autenticação para ser acessada;

FORMATO DE REQUISIÇÃO:

Não precisa body de requisição.

FORMATO DE RESPOSTA:

Response body:


```
      	[
                {
                        "id": 5,
                        "name": "Médico do dedao"
                },
                {
                        "id": 6,
                        "name": "Cardiologia"
                },
                {
                        "id": 7,
                        "name": "Dermatologia"
                },
                {
                        "id": 8,
                        "name": "Oftalmologia"
                }
        ]
```



## GET /speciaties/:id/doctors

Rota deve listar a especialidade e os doctors que pertecem a ela;

A rota não precisa de autenticação para ser acessada;

FORMATO DE REQUISIÇÃO:

Não precisa de body de requisição.

FORMATO DE RESPOSTA:

Response body:


```       
        {
                "id": 5,
                "name": "Cadiologia",
                "doctors": [
                        {
                                "id": "4d2820c9-411e-4457-8c3e-532335e37bf1",
                                "name": "Tadeu",
                                "email": "medicotadeu@gmail.com",
                                "password": "$2b$10$mVu7PVGuy7ZMji84CxLVXuXCv04wF9GAPQSpXD00SBvDZbiga59Ie",
                                "CRM": "MG123419",
                                "sex": "Masculino",
                                "age": 33,
                                "createdAt": "2022-11-08T22:48:37.949Z",
                                "updatedAt": "2022-11-08T22:48:37.949Z",
                                "isActive": true,
                                "address": {
                                        "id": "6abe755b-5aa4-4480-95b0-a3a01035800a",
                                        "district": "Rua Doctor Pires de camargo",
                                        "zipCode": "18155000",
                                        "number": 68,
                                        "state": "SP",
                                        "city": "Piedade"
                                }
                        },
                        {
                                "id": "cba3d70b-1b41-4a16-ad39-027dc3eccbc2",
                                "name": "Tadeu",
                                "email": "medicotadeu2@gmail.com",
                                "password": "$2b$10$Rejq1I7Rw9ODLwazeZxaSuW./DvgpLgmwDaPr48Mhr7cZrsZf7Raq",
                                "CRM": "MG123410",
                                "sex": "Masculino",
                                "age": 33,
                                "createdAt": "2022-11-08T23:44:31.817Z",
                                "updatedAt": "2022-11-08T23:44:31.817Z",
                                "isActive": true,
                                "address": {
                                        "id": "46de3208-8876-4dab-b455-53e632d49fc3",
                                        "district": "Rua Doctor Pires de camargo",
                                        "zipCode": "18155000",
                                        "number": 68,
                                        "state": "SP",
                                        "city": "Piedade"
                                }
                        }
                ]
        }
```

	
 
 
### ERRORS 

Especialidade com id inválida;

Response status: 404 Not found


```
       {
          message: “Specialty not found”
       }
``` 


# ROTA /USERS
## POST - /users

Rota para criação de usuário com os seguintes dados:

id: Não deve ser passado mas gerado no momento da validação dos dados, deve um uuidv4.
<br>
name: string
<br>
email: string
<br>
password: Deverá receber uma string mas armazenar uma hash gerada com o bcryptjs
<br>
cpf: string
<br>
age: number
<br>
sex: string
<br>
address: um objeto com os seguintes dados:
<br>
district: string
<br>
zipCode: string
<br>
number: string
<br>
city: string
<br>
state: string
<br>
createdAt: Não deve ser passado, mas gerado no momento da validação dos dados no formato Date
<br>
updatedAt: Não deve ser passado, mas gerado no momento da validação dos dados no formato Date, deve iniciar com o valor de criação (mesmo valor do campo createdAt) e deve ser atualizado sempre que esse usuário for atualizado.
<br>
isAdm: boolean
<br>
isActive: Não deve ser passado, mas gerado no momento da validação dos dados no formato boolean com default = true

Não podem ser cadastrados dois usuário com o mesmo e-mail;
<br>
O CPF deve ter 11 caracteres e não podem haver dois usuários com o mesmo cpf.
<br>
AGE deve ter no máximo 3 caracteres;
<br>
STATE: deve ter 2 caracteres;

EXEMPLO REQUISIÇÃO:

```
        {
                "name": "João",
                "email": "joao@gmail.com",
                "password": "123456",
                "CPF": "12345678958",
                "age": 30,
                "sex": "Masculino",
                "isAdmin": true,
                "img": "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
                "address": {
                        "district": "Rua Arnold Schwarzenegger",
                        "zipCode": "12345678",
                        "number": "5000",
                        "city": "Stronger",
                        "state": "SP"
                }
        }

```

EXEMPLO RESPOSTA:

Response status: 201 CREATED 

Response body: 

```
     {
        "name": "kenzinho",
        "email": "kenzinho@kenzie.com",
        "CPF": "01001001057",
        "age": 30,
        "sex": "feminino",
        "img": "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
        "isAdmin": true,
        "address": {
                "id": "e8715a8f-9678-4ee0-bcb7-47af313d1c29",
                "district": "Rua Heleodo Pires de camargo",
                "zipCode": "12345678",
                "number": "68",
                "state": "SP",
                "city": "Piedade"
        },
        "id": "d33a9842-2628-40d6-9813-54b34d34cd61",
        "createdAt": "2022-11-08T13:06:40.862Z",
        "updatedAt": "2022-11-08T13:06:40.862Z",
        "isActive": true
     {
```

### ERRORS 

Email já cadastrado;

Response status: 400 bad request

Response body:

```
     {
        message: “Email already exist”
     }
```
CPF já cadastrado;

Response status: 400 bad request

Response body:

```
    {
        message: “CPF already exist”
    }
```

## GET - /users

Lista todos os dados dos usuários, com exceção da hash de senha.

A rota pode ser acessada apenas por administradores.


REQUISIÇÃO:

	- Não precisa body de requisição.
 
```
    header: {
      Authorization: Bearer {adm token}
    }
```
Response: 200 OK

EXEMPLO DE RESPOSTA:


```
   [
	{
		"id": "46c98593-e72f-404b-8a0d-6793b8c5cd22",
		"name": "isAdmin",
		"email": "isAdmin4@gmail.com",
		"CPF": "12345678958",
		"age": 30,
		"sex": "Masculino",
		"img": "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
		"createdAt": "2022-11-08T22:48:16.362Z",
		"updatedAt": "2022-11-08T22:48:16.362Z",
		"isAdmin": true,
		"isActive": true,
		"address": {
			"id": "a436d896-915c-4a82-ae14-537f18db5063",
			"district": "Rua Arnold Schwarzenegger",
			"zipCode": "12345678",
			"number": 5000,
			"state": "SP",
			"city": "Stronger"
		},
		"schedules": [ ]
	}
   ]
```

### ERRORS 

Sem headers de autorização;

Response status: 401 Unauthorized

Response body:

```
        {
                message: “Missing authorization headers”
        }
```

Usuário não é um administrador;

Response status: 401 Forbidden

Response body:

```
        {
                message: “User is not an Administrator”
        }
```

Token inválido

Response status: 403 Forbidden

Response body:

```
        {
                message: “Invalid Token”
        }
```

## GET - /users/profile

Retorna todos os dados do usuário logado.
<br>
A rota pode ser acessada apenas pelo usuário logado;

EXEMPLO REQUISIÇÃO:

Não precisa de body de requisição.


```
        heafers: {
          Authorization: Bearer {token}
        }
```

### ERRORS 

Requisição sem headers de autorização;

Response status: 401 Unauthorized

Response body:


```
        {        
                message: “Missing authorization headers”
        }
```


Requisição sem permição de administrador;

Response status: 401 Forbidden, 

Response body:

```
        {
                message: “User is not an Administrator”
        }
```
Token inválido;

Response status: 403 Forbidden

Response body:


```
        {
            message: “Invalid Token”
        }
```

## PATCH - /users/:id

A rota deve atualizar os dados do usuário.
<br>
Não deve ser possível atualizar os campos id, isAdm, isActive, createdAt e updatedAt.
<br>
Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.

EXEMPLO REQUISIÇÃO:

Body da requisição dados do usuário:
 

```
        {
            "name": "João Stevan",
            "email": "joaostevan@gmail.com"
        }
```

Body da requisição update do endereço do usuário:


```
        {
            "address": {
                "number": 67
            }
        }
```


EXEMPLO DE RESPOSTA:

```
        {
                "id": "960c3f4c-ad79-4947-b99e-563f92ceaf2f"
                "name": "João Stevan",
                "email": "joaostevan@gmail.com",
                "password":   "$2b$10$mVfS2XQpy.0pN4Poq1cRJe36FsFTHvG.mGqe5EWzLp8GEv224  L2CK",
                "CPF": "01001001010",
                "age": 51,
                "sex": "Masculino",
                "isAdmin": true,
                "isActive": true,
                "createdAt": "2022-11-03T01:13:51.230Z",
                "updatedAt": "2022-11-05T01:18:43.542Z",
                "address": {
                        "district": "Rua Heleodo Pires de camargo",
                        "zipCode": "18150000",
                        "number": "67",
                        "city": "Piedade",
                        "state": "SP",
                },
                “schedules”: [ ]
        }
```

### ERRORS

Sem header de autorização;

Response status: 401 Unauthorized

Response body:

```
        {        
                message: “Missing authorization headers”
        }
```


Token inválido;

Response status: 403 Unauthorized

Response body:

```
        {        
                message: “Missing authorization headers”
        }
```

Usuário não encontrado;

Response status: 404 Not Found

Response body:

```
        {
                message: “User not found”
        }
```

Endereço do usuário não encontrado;

Response status: 404 Not Found

Response body:

```
        {
                message: “Address not found”
        }
```

Tentativa de alterar os campos id, CPF, isAdm, isActive, createdAt e updatedAt;

Response status: 400 bad request

Response body:

```
        {
                message: “Cannot update id, CPF, isAdim, isActive, createdAt or updatedAt”
        }
```


## DELETE - /users/:id

Altera desativa a conta do usuário logado, ou de outro usuário se for um administrador;

A rota deve realizar um soft delete do usuário, alterando isActive para false.
<br>
A rota pode ser acessada apenas pelo usuário logado;
<br>
Não deve ser possível realizar um soft delete um usuário inativo.

REQUISIÇÃO:

Sem body de requisição;

Response status: 204 OK

Sem Body de Response;


### ERRORS

Sem header de autorização;

Response status: 401 Unauthorized

Response body:

```
        {        
                message: “Missing authorization headers”
        }
```

Usuário já desativado;

Response body: 400 bad request

Response body:

```
        {        
                message: “User already disabled”
        }
```

Usuário não encontrado;

Response status: 404 Not Found

Response body:

```
        {
                message: “User not found”
        }
```

# ROTA /DOCTORS

## POST - /doctors
Realiza a criação de um usuário médico

Rota para criação de usuários que sejam Médicos:
<br>
id :  Não será passado, mas será gerado de forma automática no momento da criação e será feito através de um UUID.
<br>
name: string
<br>
email: string
<br>
password: string
<br>
crm: string
<br>
speciality:  será um object com os seguintes dados:
<br>
sex: string
<br>
createdAt:  Não deve ser passado, mas gerado no momento da validação dos dados no formato Date.
<br>
updatedAt: Não deve ser passado, mas gerado no momento da validação dos dados no formato Date, deve iniciar com o valor de criação (mesmo valor do campo createdAt) e deve ser atualizado sempre que esse usuário for atualizado.
<br>
address: será um object com os seguintes dados:
<br>
district: string
<br>
zipCode: string
<br>
number: string
<br>
state: string
<br>
isActive: Não deve ser passado, mas gerado no momento da validação dos dados no formato boolean com default = true

A rota de criação deve retornar todos os dados, com exceção da hash de senha;
<br>
Não podem ser cadastrados dois usuário com o mesmo e-mail;
<br>
O CRM deve ter 8 caracteres máximos, 2 letras e 6 números, não podem haver dois usuários com o mesmo CRM.
<br>
AGE deve ter no máximo 3 caracteres;
<br>
STATE: deve ter 2 caracteres.

EXEMPLO REQUISIÇÃO:

```
        {
            "name": "test",
            "email": "test@gmail.com",
            "password": "1234445",
            "CRM": "MG12446",
            "sex": "Masculino",
            "age": 33,
            "specialtiesId": {
                "id": 1
            },
            "address": {
                "district": "Rua Doctor Pires de camargo",
                "zipCode": "18155000",
                "number": "68",
                "city": "Piedade",
                "state": "SP"
            }
        }	
```

EXEMPLO RESPOSTA:

Response status: 201 CREATED 


```
        {
                "name": "test",
                "email": "test@gmail.com",
                "password": "1234445",
                "CRM": "MG12446",
                "sex": "Masculino",
                "age": 33,
                "specialties": {
                        "id": 1,
                        "name": "Médico do zuvido"
                },
                "address": {
                        "district": "Rua Doctor Pires de camargo",
                        "zipCode": "18155000",
                        "number": "68",
                        "city": "Piedade",
                        "state": "SP",
                        "id": "c6d46472-b25b-4406-82d0-1459273cd5d2"
                },
                "id": "839e1f17-4bd8-4292-8d69-a6584edeed0a",
                "createdAt": "2022-11-08T21:19:07.299Z",
                "updatedAt": "2022-11-08T21:19:07.299Z",
                "isActive": true
        }	
```

### ERRORS 

Email já cadastrado;

Response status: 400 bad request

Response body:

```
        {
            "message": "E-mail already exists"
        }	
```
CRM já cadastrado;

Response status: 400 bad request

Response body:

```
        {
                "message": "CRM already exists"
        }
```

## GET - /doctors
Lista todos os usuários médicos;

A rota deve retornar todos os dados dos usuários médicos,  contudo retornará com apenas os dados relevantes que sejam públicos.
<br>
A rota pode ser acessada por todos usuários.

REQUISIÇÃO:

Não precisa ter body de requisição;
    
EXEMPLO DE RESPOSTA:

```
        [
                {
                        "id": "839e1f17-4bd8-4292-8d69-a6584edeed0a",
                        "name": "Tadeu",
                        "email": "medicotadeu3@gmail.com",
                        "CRM": "MG123414",
                        "sex": "Masculino",
                        "age": 33,
                        "createdAt": "2022-11-08T21:19:07.299Z",
                        "updatedAt": "2022-11-08T21:19:07.299Z",
                        "isActive": true,
                        "specialties": {
                                "id": 3,
                                "name": "Cardiologia"
                        },
                        "address": {
                                "id": "c6d46472-b25b-4406-82d0-1459273cd5d2",
                                "district": "Rua Doctor Pires de camargo",
                                "zipCode": "18155000",
                                "number": 68,
                                "state": "SP",
                                "city": "Piedade"
                        }
                }
        ]	
```

## GET - /doctors/profile
Lista os dados do usuário médico que está logado

A rota deve retornar todos os dados do usuário médico, com exceção da hash de senha.
<br>
a rota pode ser acessada apenas pelo dono.

REQUISIÇÃO:

Não precisa ter body de requisição;

```
        headers: {
                Authorization: Bearer {doctor token}
        }
```

EXEMPLO RESPOSTA:

```
        {
                "id": "4d2820c9-411e-4457-8c3e-532335e37bf1",
                "name": "Tadeu",
                "email": "medicotadeu@gmail.com",
                "password": "$2b$10$mVu7PVGuy7ZMji84CxLVXuXCv04wF9GAPQSpXD00SBvDZbiga59Ie",
                "CRM": "MG123419",
                "sex": "Masculino",
                "age": 33,
                "createdAt": "2022-11-08T22:48:37.949Z",
                "updatedAt": "2022-11-08T22:48:37.949Z",
                "isActive": true,
                "address": {
                        "id": "6abe755b-5aa4-4480-95b0-a3a01035800a",
                        "district": "Rua Doctor Pires de camargo",
                        "zipCode": "18155000",
                        "number": 68,
                        "state": "SP",
                        "city": "Piedade"
                },
                "schedules": [ ],
                "specialties": {
                        "id": 5,
                        "name": "Médico do dedao"
                }
        }	
```

### ERRORS

Sem headers de autorização

Response status: 401 Unauthorized

Response body:

```
        {
                "message": “Missing authorization headers”
        }	
```


## GET - /doctors/:id
A Roda Lista o médico indicado pelo ID

A rota deve retornar todos os dados do usuário médico alvo,  contudo retornará com apenas os dados relevantes que sejam públicos.
<br>
A rota pode ser acessada por todos usuários.

REQUISIÇÃO:

Não precisa ter body de requisição preenchido.

Não precisa de headers de autorização;

EXEMPLO RESPOSTA:


```
        {
                "id": "4d2820c9-411e-4457-8c3e-532335e37bf1",
                "name": "Tadeu",
                "email": "medicotadeu@gmail.com",
                "CRM": "MG123419",
                "sex": "Masculino",
                "age": 33,
                "createdAt": "2022-11-08T22:48:37.949Z",
                "updatedAt": "2022-11-08T22:48:37.949Z",
                "isActive": true,
                "address": {
                        "id": "6abe755b-5aa4-4480-95b0-a3a01035800a",
                        "district": "Rua Doctor Pires de camargo",
                        "zipCode": "18155000",
                        "number": 68,
                        "state": "SP",
                        "city": "Piedade"
                },
                "specialties": {
                        "id": 5,
                        "name": "Médico do dedao"
                },
                "schedules": [	]
        }	
```

### ERRORS
Doctor não encontrado;

Response status: 404 not found


```
        {
            "message": "Doctor not found"
        }	
```

## PATCH - /doctors/:id
A rota deverá atualizar os dados do médico logado.
<br>
A rota pode ser acessada por usuário logado ou administrador.

O usuário logado poderá atualizar somente os seguintes dados: name, email, password, age, sex, specialtiesID e address.

headers: 

```
        {
                Authorization: Bearer {doctor token}
        }   
```

EXEMPLO REQUISIÇÃO:

```
        {
            "name": "João Sebastião",
        }	
```

EXEMPLO RESPOSTA:

```
        {
                "id": "4d2820c9-411e-4457-8c3e-532335e37bf1",
                "name": "João Sebastião",
                "email": "medicotadeu@gmail.com",
                "password": "$2b$10$mVu7PVGuy7ZMji84CxLVXuXCv04wF9GAPQSpXD00SBvDZbiga59Ie",
                "CRM": "MG123419",
                "sex": "Masculino",
                "age": 33,
                "createdAt": "2022-11-08T22:48:37.949Z",
                "updatedAt": "2022-11-09T01:16:42.268Z",
                "isActive": true,
                "address": {
                        "id": "6abe755b-5aa4-4480-95b0-a3a01035800a",
                        "district": "Rua Doctor Pires de camargo",
                        "zipCode": "18155000",
                        "number": 68,
                        "state": "SP",
                        "city": "Piedade"
                },
                "specialties": {
                        "id": 5,
                        "name": "Médico do dedao"
                },
                "schedules": []
        }	
```


### ERRORS
Sem header de autorização;

Response status: 401 bad request

```
        {
            "message": "Missing authorization headers"
        }	
```

Usuário a ser alterado não é o mesmo logado ou não tem permição de administrador;

Response : 403 Forbidden


```
        {
                "message": “Unauthorized”
        }	
```


## DELETE - /doctors/:id
A roda fará a desativação do médico especifico no Banco de Dados (Soft Delete)

A realização do Soft Delete só poderá ser feita pelo próprio doctor ou pelo administrador.

REQUISIÇÃO:

Não precisa ter body de requisição.

```
        headers: {
            Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjY2Mzg3NzMwLCJleHAiOjE2NjY0NzQxMzAsInN1YiI6IjY4OTk2ODVhLWFmZGEtNDFkYS05MmU3LTdkNzY0YjVkMDkwOCJ9.bxA8E2UOv7ZtO_UkTMoHwv104R8ang0uS8HCtfsJ15c
        }
```


EXEMPLO RESPOSTA:

Response status: 204 OK 

Response body:

```
        {
                "message": “User disabled!”
        }	
```


### ERRORS

Sem headers de autorização:

Response Status: 401 bad request

Response body:

```
        {
            "message": "Missing authorization headers"
        }	
```
Doctor á ser aleterado diferente no logado ou sem permição de administrador.

Response body: 401 Unauthorized

```
        {
                "message": “Unauthorized”
        }	
```

Doctor não encontrado.

Reponse status: 404 not found

Reponse body:

```
        {
                "mesage": "Doctor not found"
        }
```

# ROTA /SCHEDULES

## POST - /schedules

Rotas responsável pelo agendamento da consulta ou exame com o médico, com os seguintes dados:

id:Não deve ser passado mas gerado no momento da validação dos dados, deve um uuidv4.
<br>
date: Deve ser informado no body;
<br>
hour:Deve ser informado no body;
<br>
type: String informado o tipo de atendimento exame ou consulta;
<br>
description: Descrição da Consulta ou Exame.
<br>
doctorsID: String
<br>
isAvailable: Não deve ser passado, mas gerado no momento da validação dos dados no formato boolean com default = true
<br>
createdAT:  Não deve ser passado mas gerado no momento da validação dos dados no formato Date
<br>
updatedAT: Não deve ser passado mas gerado no momento da validação dos dados no formato Date
<br>
userID: String, esse deve ser passado no momento da confirmação do agendamento pelo usuário, no momento da criação estará vazio.
<br>
status: String (disponível, cancelado, agendado, paciente não compareceu.)

A rota deve retornar todos os dados;
<br>
A rota só pode ser criada por médicos;
<br>
Não pode ser criado um agendamento para o mesmo dia e horário já existente;


EXEMPLO DE BODY REQUISIÇÃO:


```
       {
                "type": "exame",
                "description": "Endoscopia",
                "hour": "10:00",
                "date": "12/11/2022"
                "doctor": "cba3d70b-1b41-4a16-ad39-027dc3eccbc2"
       }
```

EXEMPLO RESPOSTA:

Response status: 201 CREATED

Response body:

```
        {
                "id": "c80c2ffd-4663-41ff-8d70-2cc46d432716",
                "date": "07/11/2022",
                "hour": "14:00",
                "type": "TestSchedule2",
                "description": "Testando",
                "createdAt": "2022-11-09T02:00:47.302Z",
                "updatedAt": "2022-11-09T02:00:47.302Z",
                "isAvailable": true
                "doctor": {
                        "id": "cba3d70b-1b41-4a16-ad39-027dc3eccbc2",
                        "name": "MG000000",
                        "email": "medicotadeu@gmail.com",
                        "CRM": "MG123419",
                        "sex": "Masculino",
                        "age": 33,
                        "createdAt": "2022-11-08T22:48:37.949Z",
                        "updatedAt": "2022-11-09T01:16:42.268Z",
                        "isActive": true,
                        "address": {
                                "id": "6abe755b-5aa4-4480-95b0-a3a01035800a",
                                "district": "Rua Doctor Pires de camargo",
                                "zipCode": "18155000",
                                "number": 68,
                                "state": "SP",
                                "city": "Piedade"
                        }
                }
        }
```


### ERRORS 

Sem headers de autorização.

Response status: 401 Unauthorized

Response body:

```
     {        
        "message": “Missing authorization headers”
     }
```

Erro o permissão, caso a rota esteja sendo acessada sem autorização de admin ou usuario não é medico

Response status: 401 Forbidden

Response body:

```
    {
        "message": “You need to be a doctor or a admin to access this route”
    }
```

## PATCH - /schedules/edit/:<id>

Rotas responsável pela edição de um agendamento, com o seguinte corpo;

doctorID: Não pode ser alterado;
Os campos que podem ser editados são os type, description,hour e date.
A rota só pode ser acessada por médicos ou administradores;
Se o campo userID já estiver preenchido não poderá ser feito a edição 
updatedAt: Deve ser passado automaticamente no momento da atualização



EXEMPLO DE BODY REQUISIÇÃO:
REQUISIÇÃO:

```
      {
      “description”: “Endoscopia”,
      "hour": "19:00"
      }
```

- headers:

```
        {
            Authorization: Bearer  {token}
        }
```

Response: 200 OK 

```
         {
        “message” : “Schedule updated with success!”
         }
```


### ERRORS 
Erro de criação do agendamento caso já possua usuário registrado 
Response body: 400 bad request, 

```
        {        
        message: “Can’t modificate schedule, Is already schedule for a user”
        }
```


Response body: 401 Unauthorized

```
        {        
         message: “Missing authorization headers”
        }
```

Erro o permissão, caso a rota esteja sendo acessada sem autorização de admin: 
Response body: 401 unauthorized, 

```
        {
        message: “Unauthorized! Need admin ou doctor credential ”
        }
```

Error de id, não encontrou o schedule
Response body: 404 Not Found, 

```
        {
        message: “Schedule not found”
        }
```


## PATCH - /schedules/:id

Edite do agendamento, com o seguinte corpo:
<br>
A rota pode ser acessada pelo usuário e pelo admin;
<br>
isAvailable: Alterado automaticamente para FALSE não vem a requisição no body;
<br>
status: Modifica o status para agendado;
<br>
userID: Não será passado no corpo da requisição
<br>


EXEMPLO DE BODY REQUISIÇÃO:
REQUISIÇÃO:
Sem body de requisição
      - headers: 
  

```     
            {
                Authorization: Bearer  {token}
            }
```

Response: 200 OK 

```
        {
	"updatedSchedule": {
		"id": "28664ebc-7acd-4d36-b0ab-0a55bc9359e9",
		"createdAt": "2022-11-08T20:54:47.292Z",
		"updatedAt": "2022-11-08T21:10:07.297Z",
		"date": "2022-11-07",
		"hour": "11:00:00",
		"type": "TestSchedule2",
		"description": "Testando",
		"isAvailable": false,
		"user": {
			"id": "eb32e08e-5acf-4288-b744-8cb2492f03d2",
			"name": "isAdmin",
			"email": "isAdmin2@gmail.com",
			"CPF": "12345678955",
			"age": 30,
			"sex": "Masculino",
			"img": "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
			"createdAt": "2022-11-08T20:49:56.010Z",
			"updatedAt": "2022-11-08T20:49:56.010Z",
			"isAdmin": true,
			"isActive": true,
			"address": {
				"id": "cc2fdafc-dc0d-422a-b5e8-a9552eed96b4",
				"district": "Rua Arnold Schwarzenegger",
				"zipCode": "12345678",
				"number": 5000,
				"state": "SP",
				"city": "Stronger"
			}
		},
		"doctor": {
			"id": "67efc4eb-01a0-49ca-9b31-d87fbd7d745c",
			"name": "Tadeu",
			"email": "medicotadeu3@gmail.com",
			"CRM": "MG123414",
			"sex": "Masculino",
			"age": 33,
			"createdAt": "2022-11-08T20:54:04.111Z",
			"updatedAt": "2022-11-08T20:54:04.111Z",
			"isActive": true,
			"address": {
				"id": "1130951f-746c-4213-95b2-1b4127085243",
				"district": "Rua Doctor Pires de camargo",
				"zipCode": "18155000",
				"number": 68,
				"state": "SP",
				"city": "Piedade"
			}
		}
	},
	"message": "Schedule with sucess"
}
```




### ERRORS 

Response body: 401 Unauthorized

```
        {        
        message: “Missing authorization headers”
        }
```

Erro o permissão, caso a rota esteja sendo acessada sem autorização de admin: 
Response body: 403 Forbidden, 

```
        {
            message: “Unauthorized! Need admin ou doctor credential ”
        }
```

Response body: 403 Forbidden

```
        {
            message: “Invalid Token”
        }
```

Response body: 404 Not Found

```
        {
        message: “Doctor not found”
        }
```






## DELETE - /schedules/:<id>

SoftDelete do agendamento, com o seguinte corpo:
A rota pode ser acessada pelo usuário dono do agendamento e pelo admin;
isAvailable: Alterado automaticamente para TRUE não vem a requisição no body;
userID: deve ser colocado como null, na requisição


REQUISIÇÃO:
	- Não precisa body de requisição.
	- headers: 
 
```
        {
                Authorization: Bearer  {token}
        }
```

EXEMPLO DE RESPOSTA
Response: 200 OK 


```
        {
        message: Schedule deleted with success!”
        }
```


### ERRORS 

Response body: 401 Unauthorized

```
        {        
         message: “Missing authorization headers”
        }
```

Response body: 403 

```
        {
        message: “Unauthorized”
        }
```

Response body: 403 Forbidden

```
        {
        message: “Invalid Token”
        }
```


Response body: 404 Not Found

```
        {
        message: “User not found”
        }
```


## GET - /schedules

Essa rota lista todos os agendamentos disponíveis;

A rota pode ser acessada apenas por administradores 


REQUISIÇÃO:
	- Não precisa body de requisição.
	- headers: 
 
```
        {
         Authorization: Bearer  {token}
        }
```

### ERRORS 
Response body: 401 Unauthorized

```
        {        
         message: “Missing authorization headers”
        }
```

Response body: 403 Forbidden

```
        {
         message: “Unauthorized”
        }
```

Response body: 403 Forbidden

```
        {
         message: “Invalid Token”
        }
```



## GET - /schedules/doctor

 Retorna todos os agendamentos do médico logado
Somente o médico logado  pode ter acesso ao agendamento

REQUISIÇÃO:
	- Não precisa body de requisição.
	- headers:
 
 
```
        {
        Authorization: Bearer  {token}
        }
```


Response: 200 OK 
Lista com todos o agendamentos

```
        {
        }
```


### ERRORS 
Response body: 401 Unauthorized

```
        {        
         message: “Missing authorization headers”
        }
```

Response body: 403 Forbidden

```
        {
         message: “Unauthorized”
        }
```

Response body: 403 Forbidden

```
        {
        message: “Invalid Token”
        }
```


## GET - /schedules/user

 Retorna todos os agendamentos do usuário logado
Somente o usuário logado  pode ter acesso ao agendamento

REQUISIÇÃO:
	- Não precisa body de requisição.
	- headers: 
 
```
        {
        Authorization: Bearer  {token}
        }
```

Response: 200 OK 
Lista com todos o agendamentos

```
        {
        }
```

### ERRORS 

Response body: 401 Unauthorized

```
        {        
         message: “Missing authorization headers”
        }
```

Response body: 403 Forbidden

```
        {
         message: “Unauthorized”
        }
```


Response body: 403 Forbidden

```
        {
        message: “Invalid Token”
        }
```


Response body: 400 bad request

```
        {
        message: “User dont have any schedule”
        }
```


</details>


## Tecnologias Utilizada

<div style='display:flex; gap: 5px;'><br>
  
 <img align="center" alt="node.js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">

 <img align="center" alt="express.js" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">

  <img align="center" alt="jest" src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">

  <img align="center" alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">

   
</div></br>

## Ferramentas Utilizadas

<div style='display:flex; gap: 5px;'><br>
 <img align="center" alt="jira" src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white">  
 <img align="center" alt="heroku" src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white">  
</div></br>

## Equipe

<ul>
<li><a href="https://github.com/annekarolle">Anne K R Oliveira</a></li>
<li><a href="https://github.com/DnlGalvan">Daniel Galvan</a></li>
<li><a href="https://github.com/fredericosafebox" >Frederico Costa</a></li>
<li><a href="https://github.com/fredrook">Frederico Rook Chaves </a></li>
 <li><a href="https://github.com/marcelo-kodaira">Marcelo Kodaira</a></li> 
<li><a href="https://github.com/marcuspvh">Marcus Roberto Ribeiro</li>
</ul>
