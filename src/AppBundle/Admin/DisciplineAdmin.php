<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\HttpKernel\Debug\TraceableEventDispatcher;
use Symfony\Component\HttpKernel\KernelInterface;

class DisciplineAdmin extends AbstractAdmin
{

    private $kernel;

    public function __construct($code, $class, $baseControllerName, KernelInterface $kernel)
    {
        parent::__construct($code, $class, $baseControllerName);
        $this->kernel = $kernel;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('name', 'text')
            ->add('gitUrl', 'text', array('required' =>false))
            ->add('gitKey','text', array('required' =>false))
            ->add('sessions');
    }

    // Fields on which entities can be filtered.
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('name');
    }

    // Fields that will be displayed in list view
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('id')
            ->add('name')
            ->add('gitUrl')
            ->add('sessions');
    }

    /**
     * @param mixed $discipline
     * Duplicate the code from DisciplineSuscriber to create a folder in var/git.
     */
    public function postPersist($discipline){
        $rootDir = $this->kernel->getRootDir();
        if(!is_dir($rootDir.'/../var/git/'.$discipline->getId())) {
            mkdir($rootDir . '/../var/git/' . $discipline->getId());
        }
    }
}
