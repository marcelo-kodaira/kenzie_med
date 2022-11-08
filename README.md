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
	
Response: 200 OK 

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
	
Response: 200 OK 

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
	Response body: 400 Bad request
 
```
     {
      “message”: “ ‘email’ is a required information ”
     }
```


Senha não informada:
	Response body: 400 Bad 
 
```
      {
      “message”: “ ‘password’ is a required information ”
      }
```

Senha e/ou email incorretos:
	Response body: 400 Bad request
 
```
       {
        “message”: “ Invalid email and/or password ”
       }
```




Usuário inativo:
Response body: 403 Unauthorized

```
     {
      “message”: “User is currently inactive”
     }
```

Médico inativo:
Response body: 403 Unauthorized

```
    {
       “message”: “Doctor is currently inactive”
    }
```


# Rota /SPECIALTIES

## POST /specialties
Rota a criação de especialidades com os seguintes dados:
name: string,
id: não deve ser passado mas gerado no momento de validação dos dados, deve ser uuidv4;
Não podem ser cadastradas duas especialidades com o mesmo nome;
A rota só pode ser acessada por administradores.

FORMATO DE REQUISIÇÃO: 

```
    {
      “name”: “Cardiologia”
    }
     
```

FORMATO DE RESPOSTA:
Response: 201 CREATED

```
    {
      “id”: “a127f4f-3703-40ed-820f-84c077b2736e”,
      “name”: “Cardiologia”
    }
```


### ERRORS 

Response body: 401 Unauthorized

```
    {        
        message: “Missing authorization headers”
    }
```

Response body: 401 Unauthorized

```
     {        
         message: “Missing authorization headers”
     }
```

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

Response body: 400 bad request,

```
    {
    message: “Specialty name already exist”
    }
```



## GET /specialties

Deve listar todas as categorias;
A rota não precisa autenticação para ser acessada;

FORMATO DE REQUISIÇÃO:

Não precisa body de requisição.

FORMATO DE RESPOSTA:
Response: 201 CREATED


```
      {
       “id”: 1,
       “name”: “Cardiologia”
      },
      {
       “id”: 2,
       “name”: ”Dermatologia”
      },
     {
       “id”: 3,
       “name”: “Penumologia”
      }
```



## GET /speciaties/:<id>/doctors

Rota deve listar todos os os médicos que pertencem a uma especialidade;
A rota não precisa de autenticação para ser acessada;

FORMATO DE REQUISIÇÃO:

Não precisa de body de requisição.

FORMATO DE RESPOSTA:
Response: 201 CREATED


```       
{
       “id” : 1,
       “name”: “Cardiologia”,
       “doctors”: [
       {
       "name": "Marcus Doctor",
       "email": "marcusdoctor@gmail.com",
       "password": "$2b$10$fe5Q2Sx8K8ZQmf5HtEsZjOAU0n2SJdQ1VkgKBy8v94jljWXrRX/O",
       "CRM": "01001001010",
       "sex": "Masculino",
       "isActive": true,
       "createdAt": "2022-11-03T02:26:48.437Z",
       "updatedAt": "2022-11-03T02:26:48.437Z",
       "specialities": {
       "id": 1,
       "name": "Cardiologia"
       },
       "address": {
       "district": "Rua Doctor Pires de camargo",
       "zipCode": "18155000",
       "number": "68",
       "city": "Piedade",
       "state": "SP",
       "id": "d2989396-d2ac-443b-9db2-7c6d85faec15"
       }
       ]
       }
```

	
 
 
### ERRORS 

Erro de id, não encontrou o especialidade
Response body: 404 Not Found,


```
       {
       message: “Doctor not found”
       }
``` 


# ROTA /USERS
## POST - /users

Rota para criação de usuário com os seguintes dados:

id: Não deve ser passado mas gerado no momento da validação dos dados, deve um uuidv4.
name: string
email: string
password: Deverá receber uma string mas armazenar uma hash gerada com o bcryptjs
cpf: string
age: number
sex: string
address: um objeto com os seguintes dados:
district: string
zipCode: string
number: string
city: string
state: string
createdAt: Não deve ser passado, mas gerado no momento da validação dos dados no formato Date
updatedAt: Não deve ser passado, mas gerado no momento da validação dos dados no formato Date, deve iniciar com o valor de criação (mesmo valor do campo createdAt) e deve ser atualizado sempre que esse usuário for atualizado.
isAdm: boolean
isActive: Não deve ser passado, mas gerado no momento da validação dos dados no formato boolean com default = true

A rota de criação deve retornar todos os dados, com exceção da hash de senha;
Não podem ser cadastrados dois usuário com o mesmo e-mail;
O CPF deve ter 11 caracteres e não podem haver dois usuários com o mesmo cpf.
AGE deve ter no máximo 3 caracteres;
STATE: deve ter 2 caracteres;





EXEMPLO REQUISIÇÃO:

```
    {
    "name": "kenzinho",
      "email": "kenzinho@kenzie.com",
      "password": "123456",
       "CPF": "01001001017",
        "age": 30,
        "sex": "feminino",
     "isAdmin":true,
        "img": "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",   
       "address": {
            "district": "Rua Heleodo Pires de camargo",
            "zipCode": "12345678",
            "number": "68",
            "city": "Piedade",
            "state": "SP"
        }
    }

```




EXEMPLO RESPOSTA:
Response: 201 CREATED 


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
     }
     {
```








### ERRORS 
Erro de criação
Response body: 400 bad request


```
     {        
       message: “Email already exist”
     }
```

Response body: 400 bad request


```
    {        
      message: “CPFl already exist”
    }
```



## GET - /users

A rota deve retornar todos os dados dos usuários, com exceção da hash de senha.
A rota pode ser acessada apenas por administradores.


REQUISIÇÃO:

	- Não precisa body de requisição.
	- headers: 
 
```
    {
      Authorization: Bearer {token}
    }
```
Response: 200 OK

Lista com todos o usuarios 


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

Response body: 401 Forbidden


```
        {
         message: “User is not an Administrator”
        }
```


Response body: 403 Forbidden


```
        {
        message: “Invalid Token”
        }
```






## GET - /users/profile

A rota deve retornar todos os dados do usuário logado.
a rota pode ser acessada apenas pelo próprio usuário;


EXEMPLO REQUISIÇÃO:

- Não precisa de body de requisição.
	- headers: 
 

```
        {
          Authorization: Bearer {token}
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





## PATCH - /users/:<id>

A rota deve atualizar os dados do usuário.
Não deve ser possível atualizar os campos id, isAdm, isActive, createdAt e updatedAt.
Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.

EXEMPLO REQUISIÇÃO:

	- Body da requisição:
 

```
        {
            "name": "Tirulipa",
            "email": "tirulipa@gmail.com"
        }
```

- Body da requisição update do endereço do usuário:


```
        {
            "address": {
            "number": 67
        }
```


EXEMPLO DE RESPOSTA:
Response: 201 CREATED 


```
        {
        "id": "960c3f4c-ad79-4947-b99e-563f92ceaf2f"
        "name": "Tirulipa",
        "email": "tirulipa@gmail.com",
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
- Sem header de autorização
Response body: 401 Unauthorized


```
        {        
        message: “Missing authorization headers”
        }
```


- Token inválido
Response body: 403 Unauthorized



```
        {        
        message: “Missing authorization headers”
        }
```

- Usuário não encontrado:
Response body: 404 Not Found



```
        {
        message: “User not found”
        }
```



- Endereço do usuário não encontrado:
Response body: 404 Not Found



```
        {
        message: “Address not found”
        }
```



- Tentativa de alterar os campos id, CPF, isAdm, isActive, createdAt e updatedAt:
Response body: 400 bad request



```
        {
        message: “Cannot update id, CPF, isAdim, isActive, createdAt or updatedAt”
        }
```






## DELETE - /users/:<id>

REQUISIÇÃO:

	- Sem body de requisição.
	Response: 204 OK

A rota deve realizar um soft delete do usuário, alterando isActive para false.
a rota pode ser acessada apenas pelo usuário logado;
não deve ser possível realizar um soft delete um usuário inativo.

### ERRORS

- Sem header de autorização
Response body: 401 Unauthorized



```
        {        
         message: “Missing authorization headers”
        }
```

- Sem header de autorização
Response body: 400 bad request


```
        {        
        message: “User already disabled”
        }
```

- Usuário não encontrado:
Response body: 404 Not Found



```
        {
        message: “User not found”
        }
```

# ROTA /DOCTORS

## POST - /doctors
( Realiza a criação de um usuário médico )

Rota para criação de usuários que sejam Médicos:
id :  Não será passado, mas será gerado de forma automática no momento da criação e será feito através de um UUID.
name: string
email: string
password: string
crm: string
speciality:  será um object com os seguintes dados:
name: string
sex: string
createdAt:  Não deve ser passado, mas gerado no momento da validação dos dados no formato Date.
updatedAt: Não deve ser passado, mas gerado no momento da validação dos dados no formato Date, deve iniciar com o valor de criação (mesmo valor do campo createdAt) e deve ser atualizado sempre que esse usuário for atualizado.
address: será um object com os seguintes dados:
district: string
zipCode: string
number: string
state: string
isActive: Não deve ser passado, mas gerado no momento da validação dos dados no formato boolean com default = true
A rota de criação deve retornar todos os dados, com exceção da hash de senha;
Não podem ser cadastrados dois usuário com o mesmo e-mail;
O CRM deve ter 8 caracteres máximos, 2 letras e 6 números, não podem haver dois usuários com o mesmo CRM.
AGE deve ter no máximo 3 caracteres;
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

Response: 201 CREATED 


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

- Usuário já existente
Response body: 400 bad request



```
        {
            "error": "Error",
            "message": "CRM or E-mail already exists!"
        }	
```



## GET - /doctors/profile
( Lista os dados do usuário médico que está logado )

A rota deve retornar todos os dados do usuário médico, com exceção da hash de senha.
a rota pode ser acessada apenas pelo dono.

REQUISIÇÃO:
- Não precisa ter body de requisição preenchido.
- headers: 



```
        {
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjY2Mzg3NzMwLCJleHAiOjE2NjY0NzQxMzAsInN1YiI6IjY4OTk2ODVhLWFmZGEtNDFkYS05MmU3LTdkNzY0YjVkMDkwOCJ9.bxA8E2UOv7ZtO_UkTMoHwv104R8ang0uS8HCtfsJ15c
        }
```


EXEMPLO RESPOSTA:

Response: 200 OK 


```
        [
        {
        "id": "960c3f4c-ad79-4947-b99e-563f92ceaf2f",
        "name": "Tiririca",
        "email": "tiririca@mail.com",
        "CRM": "MG 789123",
        "speciality": “cirurgião”,
        "sex": "Masculino",
        "isActive": true,
        "createdAt": "2022-11-03T01:13:51.230Z",
        "updatedAt": "2022-11-03T01:13:51.230Z",
        "address": {
                "district": "Rua Brasolia",
                "zipCode": "31030010",
                "number": "1000",
                "city": "Brasilandia",
                "state": "DF"
            }
        ]	
```

### ERRORS
Response body: 401 Unauthorized



```
        {
        message: “Missing authorization!”
        }	
```



Response body: 403 Forbidden



```
        {
        message: “Unauthorized, must be the owner!”
        }	
```




## GET - /doctors/:<id>
( A Roda Lista o médico indicado pelo ID )

A rota deve retornar todos os dados do usuário médico alvo,  contudo retornará com apenas os dados relevantes que sejam públicos.
a rota pode ser acessada por todos usuários.

REQUISIÇÃO:
- Não precisa ter body de requisição preenchido.
    - headers: 


```    
        {
            Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjY2Mzg3NzMwLCJleHAiOjE2NjY0NzQxMzAsInN1YiI6IjY4OTk2ODVhLWFmZGEtNDFkYS05MmU3LTdkNzY0YjVkMDkwOCJ9.bxA8E2UOv7ZtO_UkTMoHwv104R8ang0uS8HCtfsJ15c
        }
```

EXEMPLO RESPOSTA:

Response: 200 OK 


```
        [
        {
        "id": "ad79-4947-563f92ceaf2f-b99e-960c3f4c",
        "name": “Jubiscleyde",
        "CRM": "SP 456852",
        "speciality": “Ginecologista”,
        "sex": "Feminino",
        }
        ]	
```

### ERRORS
- Requisição falha 
Response body: 400 bad request


```
        {
            "error": "Error",
            "message": "CRM or E-mail already exists!"
        }	
```

Response body: 404 Not Found


```
        {
        message: “Doctor not found”
        }
```



## GET - /doctors
( A roda listará todos os usuários médicos que estejam ativos )

A rota deve retornar todos os dados dos usuários médicos ,  contudo retornará com apenas os dados relevantes que sejam públicos.
a rota pode ser acessada por todos usuários.

REQUISIÇÃO:
- Não precisa ter body de requisição preenchido.
    - headers:
    


```  
        {
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjY2Mzg3NzMwLCJleHAiOjE2NjY0NzQxMzAsInN1YiI6IjY4OTk2ODVhLWFmZGEtNDFkYS05MmU3LTdkNzY0YjVkMDkwOCJ9.bxA8E2UOv7ZtO_UkTMoHwv104R8ang0uS8HCtfsJ15c
        }
```

EXEMPLO RESPOSTA:

Response: 200 OK 

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
			"name": "Médico do zuvido"
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

### ERRORS
- Requisição falha 
Response body: 400 bad request

```
        {
            "error": "Error",
            "message": "CRM or E-mail already exists!"
        }	
```




## PATCH - /doctors/:<id>
( A rota deverá atualizar os dados do médico logado )

O usuário logado poderá atualizar somente os seguintes dados: name, email, password, age, sex, specialtiesID e address.
headers: 

```
        {
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjY2Mzg3NzMwLCJleHAiOjE2NjY0NzQxMzAsInN1YiI6IjY4OTk2ODVhLWFmZGEtNDFkYS05MmU3LTdkNzY0YjVkMDkwOCJ9.bxA8E2UOv7ZtO_UkTMoHwv104R8ang0uS8HCtfsJ15c
        }   
```

EXEMPLO REQUISIÇÃO:

```
        {
            "name": "Tiririca",
            "email": "tiririca@mail.com",
            "password": "123456",
            "speciality": “cirurgião”,
            "address": {
                "district": "Rua Brasolia",
                "zipCode": "31030010",
                "number": "1000",
                "city": "Brasilandia",
                "state": "DF"
            }
        }	
```




EXEMPLO RESPOSTA:
Response: 200 OK 

```
    {
    "id": "960c3f4c-ad79-4947-b99e-563f92ceaf2f",
    "name": "Tiririca Nunes",
    "email": "tiriricanunes@mail.com",
    "password": "$2b$10$mVfS2XQpy.0pN4Poq1cRJe36FsFTHvG.5EWzLp8GEv224  L2CK",
    "speciality": “cirurgião Ortopedico”,
    "isActive": true,
    "createdAt": "2022-11-03T01:13:51.230Z",
    "updatedAt": "2022-11-05T01:18:43.542Z",
    "address": {
            "district": "Rua Brasolia",
            "zipCode": "31030010",
            "number": "1000",
            "city": "Brasilandia",
            "state": "DF"
        }
    ]	
```


### ERRORS
Response body: 400 bad request

```
        {
            "error": "Error",
            "message": "CRM or E-mail already exists!"
        }	
```

Response body: 401 Unauthorized

```
        {
        message: “Missing authorization!”
        }	
```

Response body: 403 Forbidden


```
        {
        message: “Unauthorized, must be the owner!”
        }	
```






## DELETE - /doctors/:<id>
( A roda fará a desativação do médico especifico no Banco de Dados (Soft Delete) )

A rota deve retornar um “Usuário desativado”.
A realização do Soft Delete só poderá ser feita pelo próprio user dono.

REQUISIÇÃO:
- Não precisa ter body de requisição preenchido.
- headers: 

```
        {
            Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjY2Mzg3NzMwLCJleHAiOjE2NjY0NzQxMzAsInN1YiI6IjY4OTk2ODVhLWFmZGEtNDFkYS05MmU3LTdkNzY0YjVkMDkwOCJ9.bxA8E2UOv7ZtO_UkTMoHwv104R8ang0uS8HCtfsJ15c
        }
```


EXEMPLO RESPOSTA:
Response: 204 OK 

```
        {
        message: “User disabled!”
        }	
```


### ERRORS
Response body: 400 bad request

```
        {
            "error": "Error",
            "message": "CRM or E-mail already exists!"
        }	
```

Response body: 401 Unauthorized

```
        {
        message: “Missing authorization!”
        }	
```

Response body: 403 Forbidden


```
        {
        message: “Unauthorized, must be the owner!”
        }	
```

# ROTA /SCHEDULES

## POST - /schedules

Rotas responsável pelo agendamento da consulta ou exame com o médico, com os seguintes dados:

id:Não deve ser passado mas gerado no momento da validação dos dados, deve um uuidv4.
date: Deve ser informado no body;
hour:Deve ser informado no body;
type: String informado o tipo de atendimento exame ou consulta;
description: Descrição da Consulta ou Exame.
doctorsID: String
isAvailable: Não deve ser passado, mas gerado no momento da validação dos dados no formato boolean com default = true
createdAT:  Não deve ser passado mas gerado no momento da validação dos dados no formato Date
updatedAT: Não deve ser passado mas gerado no momento da validação dos dados no formato Date
userID: String, esse deve ser passado no momento da confirmação do agendamento pelo usuário, no momento da criação estará vazio.
status: String (disponível, cancelado, agendado, paciente não compareceu.)

A rota deve retornar todos os dados;
A rota só pode ser criada por médicos ou administradores;
Não pode ser criado um agendamento para o mesmo dia e horário já existente;

EXEMPLO DE BODY REQUISIÇÃO:


```
       {
        "type": "exame",
        "description": "Endoscopia",
        "doctorsID":"e6e47294-5fd1-4b1f-a73f-a6357ffa96fb",
        "hour": "10:00",
        "date": "12/11/2022"
       }
```

EXEMPLO RESPOSTA DA REQUISIÇÃO:
Response: 201 CREATED

```
      {
       "date": "14/11/2022",
       "hour": "10:00",
       "type": "exame",
       "description": "Endoscopia",
       "doctor": {
        "id": "e6e47294-5fd1-4b1f-a73f-a6357ffa96fb",
        "name": "test",
        "email": "test@gmail.com",
        "CRM": "MG12446",
        "sex": "Masculino",
        "age": 33,
        "createdAt": "2022-11-07T12:22:53.026Z",
        "updatedAt": "2022-11-07T12:22:53.026Z",
        "isActive": true,
        "address": {
         "id": "6216e342-c50d-4435-8971-671f1a7d18f8",
         "district": "Rua Doctor Pires de camargo",
         "zipCode": "18155000",
         "number": 68,
         "state": "SP",
         "city": "Piedade"
        }
       },
       "id": "4f5bfc0c-265e-4ec4-81d7-8346d074700e",
       "createdAt": "2022-11-08T12:48:09.945Z",
       "updatedAt": "2022-11-08T12:48:09.945Z",
       "isAvailable": true
      }
```




### ERRORS 
Response body: 401 Unauthorized

```
     {        
      message: “Missing authorization headers”
     }
```

Erro o permissão, caso a rota esteja sendo acessada sem autorização de admin ou usuario não é medico
Response body: 401 Forbidden, 

```
    {
     message: “You need to be a doctor or a admin to access this route”
    }
```

Response body: 403 Forbidden

```
    {
     message: “Invalid Token”
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


## PATCH - /schedules/:<"id">

Edite do agendamento, com o seguinte corpo:
A rota pode ser acessada pelo usuário e pelo admin;
isAvailable: Alterado automaticamente para FALSE não vem a requisição no body;
status: Modificar o status para agendado;
userID: Não será passado no corpo da requisição
updatedAt: Deve ser passado automaticamente no momento da atualização


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
