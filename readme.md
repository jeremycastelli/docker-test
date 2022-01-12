# tuto
https://www.youtube.com/watch?v=9zUHg7xjIqQ


## partie 1 ligne de commande

commandes apprises

docker build -t node-express-image .

docker run -d -p 3000:5000 -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env --name node-express node-express-image
-d detached mode
:ro read only


docker exec -it node-express bash

printenv peut etre utile pour afficher les variables env

docker rm node-express -fv
avec le v à la fin c'est pour supprimer les volumes anonymes associés
attention ne pas le faire sur less conteneurs de db ou l'on veut preserver les données


docker volume ls
docker volume prune



## partie 2 docker compose

docker-compose up -d

docker-compose down -v
avec le v à la fin c'est pour supprimer les volumes anonymes associés

docker-compose up -d --build
force rebuild


## partie 3 production env

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

puis ajouté dans docker file if 
--only=production : n'installe pas devdepencies


## partie 4 multi container

on rajoute mongo dans docker compose
on rajoute un named volume 
ce qui fait qu'on ne peut plus utiliser down -v 
docker volumes prune pour effacer les volumes inutiles mais attention 


## partie 5 connect containers

on utilise le nom des services dans docker-compose comme remplacement ip chaque serveur (dns)

## parttie 6 launch order

depends_on

mais surtout ajouter some logic dans l'app pour bien checker que la DB est up

## ajout de nginx

conf dans le dossier nginx
on passe les plats et on fait passer certains headers avec qui auraient ete enlevés par nginx

## load balancing

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-express=2
on lance 2 instances de node-express
et en checkant les logs on s'apercoit que ça marche

## deployment





3:39

