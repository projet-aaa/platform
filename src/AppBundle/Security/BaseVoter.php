<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 31/01/17
 * Time: 15:59
 */

namespace AppBundle\Security;

use Symfony\Component\Security\Core\Authorization\Voter\Voter;


abstract class BaseVoter extends Voter{

    const CREATE = 'create';
    const READ = 'read';
    const UPDATE = 'update';
    const DELETE = 'delete';

}
