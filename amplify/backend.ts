import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { firstBucket, secondBucket, teamDrive } from './storage/resource';

defineBackend({
  auth,
  data,
  firstBucket,
  secondBucket,
  teamDrive,
});
