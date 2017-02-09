<?php
/**
 * Created by PhpStorm.
 * User: stoakes
 * Date: 07/02/17
 * Time: 10:20
 */

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\User;

class LoadUserData extends AbstractFixture implements OrderedFixtureInterface
{

    const DEFAULT_USERS = array(
        'admin' => array('username' => 'admin', 'password' => 'admin', 'roles'=> array('ROLE_ADMIN')),
        'prof' => array('username' => 'prof', 'password' => 'prof', 'roles' => array('ROLE_PROF')),
        'eleve' => array('username' => 'eleve', 'password' => 'eleve', 'roles' => array('ROLE_ELEVE')),

        'abeyet' => array('username' => 'abeyet', 'password' => 'abeyet', 'roles'=> array('ROLE_ADMIN')),
        'vachard' => array('username' => 'vachard', 'password' => 'vachard', 'roles'=> array('ROLE_ADMIN')),
        'egibson' => array('username' => 'egibson', 'password' => 'egibson', 'roles'=> array('ROLE_ADMIN')),
        'ashimi' => array('username' => 'ashimi', 'password' => 'ashimi', 'roles'=> array('ROLE_ADMIN')),
        'jlallema2' => array('username' => 'jlallema2', 'password' => 'jlallema2', 'roles'=> array('ROLE_ADMIN')),
        'smaurel' => array('username' => 'smaurel', 'password' => 'smaurel', 'roles'=> array('ROLE_ADMIN')),
    );

    public function load(ObjectManager $manager)
    {

        foreach (self::DEFAULT_USERS as $user_model){
            $user = new User();
            $user->setUsername($user_model['username']);
            $user->setFirstname('Prenom-'.$user_model['username']);
            $user->setLastname('Nom-'.$user_model['username']);
            $user->setPlainPassword($user_model['password']);
            $user->setRoles($user_model['roles']);
            $user->setEnabled(true);
            $this->addReference('user'.$user_model['username'], $user);
            $manager->persist($user);

        }

        $manager->flush();
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 1;
    }
}