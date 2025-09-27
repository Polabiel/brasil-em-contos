import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Checkbox from "@mui/joy/Checkbox";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

export default function MuiTestPage() {
 return (
  <Sheet sx={{ minHeight: '100vh', bgcolor: 'background.surface', p: 4 }}>
   <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
    <Typography level="h1" sx={{ mb: 4, textAlign: 'center' }}>
     MUI Joy UI - Componentes Nativos
    </Typography>

    <Stack spacing={4}>
     {/* Botões */}
     <Card variant="outlined">
      <CardContent>
       <Typography level="h3" sx={{ mb: 2 }}>Botões</Typography>
       <Stack direction="row" spacing={2} flexWrap="wrap">
        <Button variant="solid" color="primary">Sólido</Button>
        <Button variant="soft" color="success">Suave</Button>
        <Button variant="outlined" color="warning">Contornado</Button>
        <Button variant="plain" color="danger">Simples</Button>
        <Button size="sm">Pequeno</Button>
        <Button size="lg">Grande</Button>
        <Button disabled>Desabilitado</Button>
       </Stack>
      </CardContent>
     </Card>

     {/* Cards */}
     <Card variant="outlined">
      <CardContent>
       <Typography level="h3" sx={{ mb: 2 }}>Cards e Variantes</Typography>
       <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card variant="outlined" sx={{ flex: 1 }}>
         <CardContent>
          <Typography level="title-md">Card Contornado</Typography>
          <Typography level="body-sm" sx={{ mt: 1 }}>
           Exemplo de card com borda
          </Typography>
         </CardContent>
        </Card>
        <Card variant="soft" color="primary" sx={{ flex: 1 }}>
         <CardContent>
          <Typography level="title-md">Card Suave</Typography>
          <Typography level="body-sm" sx={{ mt: 1 }}>
           Card com fundo colorido suave
          </Typography>
         </CardContent>
        </Card>
        <Card variant="solid" color="success" sx={{ flex: 1 }}>
         <CardContent>
          <Typography level="title-md" sx={{ color: 'var(--cv-textPrimary)' }}>Card Sólido</Typography>
          <Typography level="body-sm" sx={{ mt: 1, color: 'var(--cv-textMuted80)' }}>
           Card com fundo sólido
          </Typography>
         </CardContent>
        </Card>
       </Stack>
      </CardContent>
     </Card>

     {/* Formulários */}
     <Card variant="outlined">
      <CardContent>
       <Typography level="h3" sx={{ mb: 2 }}>Componentes de Formulário</Typography>
       <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
         <FormControl sx={{ flex: 1 }}>
          <FormLabel>Nome</FormLabel>
          <Input placeholder="Digite seu nome" />
         </FormControl>
         <FormControl sx={{ flex: 1 }}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="seu@email.com" />
         </FormControl>
        </Stack>

        <FormControl>
         <FormLabel>Região</FormLabel>
         <Select placeholder="Selecione uma região">
          <Option value="norte">Norte</Option>
          <Option value="nordeste">Nordeste</Option>
          <Option value="centro-oeste">Centro-Oeste</Option>
          <Option value="sudeste">Sudeste</Option>
          <Option value="sul">Sul</Option>
         </Select>
        </FormControl>

        <FormControl>
         <FormLabel>Comentário</FormLabel>
         <Textarea placeholder="Escreva seu comentário..." minRows={3} />
        </FormControl>

        <Box>
         <Typography level="body-md" sx={{ mb: 1 }}>Gêneros favoritos:</Typography>
         <Stack direction="row" spacing={2} flexWrap="wrap">
          <Checkbox label="Romance" />
          <Checkbox label="Drama" />
          <Checkbox label="Ficção" />
          <Checkbox label="Crônica" />
         </Stack>
        </Box>

        <FormControl>
         <FormLabel>Período preferido</FormLabel>
         <RadioGroup>
          <Radio value="classico" label="Clássico (séc. XIX)" />
          <Radio value="moderno" label="Moderno (séc. XX)" />
          <Radio value="contemporaneo" label="Contemporâneo (séc. XXI)" />
         </RadioGroup>
        </FormControl>
       </Stack>
      </CardContent>
     </Card>

     {/* Chips e Tags */}
     <Card variant="outlined">
      <CardContent>
       <Typography level="h3" sx={{ mb: 2 }}>Chips e Tags</Typography>
       <Stack spacing={2}>
        <Box>
         <Typography level="body-md" sx={{ mb: 1 }}>Variantes:</Typography>
         <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip variant="solid" color="primary">Sólido</Chip>
          <Chip variant="soft" color="success">Suave</Chip>
          <Chip variant="outlined" color="warning">Contornado</Chip>
          <Chip variant="plain" color="danger">Simples</Chip>
         </Stack>
        </Box>
        <Box>
         <Typography level="body-md" sx={{ mb: 1 }}>Categorias de Contos:</Typography>
         <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip color="primary">Literatura</Chip>
          <Chip color="success">Regionalismo</Chip>
          <Chip color="warning">Romance</Chip>
          <Chip color="danger">Drama</Chip>
          <Chip color="neutral">Crônica</Chip>
         </Stack>
        </Box>
       </Stack>
      </CardContent>
     </Card>

     {/* Tipografia */}
     <Card variant="outlined">
      <CardContent>
       <Typography level="h3" sx={{ mb: 2 }}>Sistema de Tipografia</Typography>
       <Stack spacing={2}>
        <Typography level="h1">H1 - Título Principal</Typography>
        <Typography level="h2">H2 - Título Secundário</Typography>
        <Typography level="h3">H3 - Título de Seção</Typography>
        <Typography level="h4">H4 - Subtítulo</Typography>
        <Typography level="title-lg">Title Large - Títulos Destacados</Typography>
        <Typography level="title-md">Title Medium - Títulos de Cards</Typography>
        <Typography level="title-sm">Title Small - Títulos Menores</Typography>
        <Typography level="body-lg">Body Large - Texto em destaque ou introduções</Typography>
        <Typography level="body-md">Body Medium - Texto padrão para leitura</Typography>
        <Typography level="body-sm">Body Small - Texto auxiliar, legendas e metadados</Typography>
       </Stack>
      </CardContent>
     </Card>

     <Card variant="soft" color="primary">
      <CardContent>
       <Typography level="title-lg" sx={{ textAlign: 'center' }}>
        🎉 MUI Joy UI configurado com sucesso!
       </Typography>
       <Typography level="body-md" sx={{ textAlign: 'center', mt: 1 }}>
        Agora você pode usar todos os componentes nativos do MUI diretamente.
       </Typography>
      </CardContent>
     </Card>
    </Stack>
   </Box>
  </Sheet>
 );
}