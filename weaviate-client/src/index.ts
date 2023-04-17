import weaviate, { WeaviateClient } from 'weaviate-ts-client';
import { v4 as uuidv4 } from 'uuid';

import QuestionClass, {_className as questionClassName} from './classes/Question.class';
import PlayerClass, {_className as playerClassName} from './classes/Player.class';

console.log("Weaver Client");

const client: WeaviateClient = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',  // Replace with your endpoint
  });

const id = uuidv4();

function addClasses(){
  client
    .schema
    .classCreator()
    .withClass(QuestionClass)
    .do()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err)
    });

    client
      .schema
      .classCreator()
      .withClass(PlayerClass)
      .do()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err)
      });
}

addClasses();


client.data
  .creator()
  .withClassName(questionClassName)
  .withId(id)
  .withProperties({
    'text': 'What is the meaning of life?'
  })
  .withVector([0])
  .do()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err)
  });

client.graphql
  .get()
  .withClassName(questionClassName)
  .withFields('text _additional {certainty}')
  .withNearVector({vector: [0]})
  .do()
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  });