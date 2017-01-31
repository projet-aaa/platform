<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class UserAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('login')
        ->add('firstname')
        ->add('lastname')
        ->add('token')
        ->add('role',ChoiceType::class,array(
            'choices' => array('Admin' => 'ROLE_ADMIN','Prof' => 'ROLE_PROF', 'Eleve' => 'ROLE_ELEVE')
        ))
        ->add('part',TextType::class,array('label' => 'Groupe Eleve', 'required' => false));
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('login')
        ->add('lastname')
        ->add('role');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('id')
            ->add('login')
            ->add('firstname')
            ->add('lastname')
            ->add('role');
    }
}
